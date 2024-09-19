import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, literal } from 'sequelize';
import { User } from 'src/user/user.model';
import { UserAssociates } from './user-associate.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { AssociationStatus } from './dto/association-status.enum';
import { RequestDto } from './dto/request.dto';
import { AssociateDto } from './dto/associate.dto';

@Injectable()
export class UserAssociateService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(UserAssociates)
    private userAssociatesModel: typeof UserAssociates,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
  ) {}

  async sendRequest(dto: RequestDto): Promise<void> {
    try {
      const existsAssociation = await this.userAssociatesModel.findOne({
        where: {
          [Op.or]: [
            { userId: dto.senderId, associateId: dto.receiverId },
            { userId: dto.receiverId, associateId: dto.senderId },
          ],
        },
      });
      if (existsAssociation !== null)
        throw new BadRequestException('Association already exists');

      const newAssociation = this.userAssociatesModel.build({
        userId: dto.senderId,
        associateId: dto.receiverId,
        status: AssociationStatus.PENDING,
      });

      await newAssociation.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async acceptRequest(dto: RequestDto): Promise<void> {
    try {
      const association = await this.userAssociatesModel.findOne({
        where: { userId: dto.senderId, associateId: dto.receiverId },
      });

      if (!association)
        throw new NotFoundException('There is no friend request');
      if (association.status === AssociationStatus.ACCEPTED)
        throw new BadRequestException('Already associated');

      association.status = AssociationStatus.ACCEPTED;
      await association.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async declineRequest(dto: RequestDto): Promise<void> {
    try {
      const association = await this.userAssociatesModel.findOne({
        where: { userId: dto.senderId, associateId: dto.receiverId },
      });

      if (!association)
        throw new NotFoundException('There is no friend request');

      association.status = 'Rejected';
      await association.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async cancelRequest(dto: RequestDto): Promise<void> {
    try {
      const association = await this.userAssociatesModel.findOne({
        where: { userId: dto.senderId, associateId: dto.receiverId },
      });

      if (!association)
        throw new NotFoundException('There is no friend request');

      await association.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllAssociates(userId: number): Promise<User[]> {
    try {
      const usersWithAcceptedAssociates = await this.userModel.findAll({
        include: [
          {
            model: this.agentAnalyticModel,
          },
        ],
        where: {
          id: {
            [Op.in]: literal(`(
                      SELECT "associateId"
                      FROM "UserAssociates"
                      WHERE "userId" = '${userId}' AND status = 'Accepted'
                      UNION
                      SELECT "userId"
                      FROM "UserAssociates"
                      WHERE "associateId" = '${userId}' AND status = 'Accepted'
                      )
                    `),
          },
        },
      });

      return usersWithAcceptedAssociates;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async removeAssociate(dto: AssociateDto): Promise<void> {
    try {
      const userAssociates = await this.userAssociatesModel.findOne({
        where: Sequelize.or(
          { userId: dto.userId, associateId: dto.associateId },
          { userId: dto.associateId, associateId: dto.userId },
        ),
      });

      if (!userAssociates)
        throw new NotFoundException('There is no association');

      await userAssociates.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async checkRequestStatusWithUser(
    dto: AssociateDto,
  ): Promise<UserAssociates | null> {
    try {
      const userAssociates = await this.userAssociatesModel.findOne({
        where: Sequelize.or(
          { userId: dto.userId, associateId: dto.associateId },
          { userId: dto.associateId, associateId: dto.userId },
        ),
      });

      return userAssociates;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
