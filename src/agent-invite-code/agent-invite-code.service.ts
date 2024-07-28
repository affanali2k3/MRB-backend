import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as crypto from 'crypto';
import { AgentInviteCode } from 'src/agent-invite-code/agent-invite-code.model';
import { User } from 'src/user/user.model';

@Injectable()
export class AgentInviteCodeService {
  constructor(
    @InjectModel(AgentInviteCode)
    private agentInviteCodeModel: typeof AgentInviteCode,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createCode(userEmail: string): Promise<void> {
    try {
      const agentInviteCode = this.agentInviteCodeModel.build({
        code: crypto.randomBytes(16).toString('hex'),
        userEmail: userEmail,
      });

      await agentInviteCode.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async shareCode(codeId: number, sharedEmail: string): Promise<void> {
    try {
      const agentInviteCode = await this.agentInviteCodeModel.findOne({
        where: { id: codeId },
      });

      if (!agentInviteCode)
        throw new NotFoundException('Invite code not found');

      if (sharedEmail === agentInviteCode.user.email)
        throw new BadRequestException('Cannot share code with yourself');

      if (agentInviteCode.inviteeEmail !== null)
        throw new ConflictException('Code has already been shared');

      const user = await this.userModel.findOne({
        where: { email: sharedEmail },
      });

      if (user !== null)
        throw new ConflictException('User is already on the platform');

      agentInviteCode.inviteeEmail = sharedEmail;

      await agentInviteCode.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteCode(codeId: number): Promise<void> {
    try {
      const agentInviteCode = await this.agentInviteCodeModel.findOne({
        where: { id: codeId },
      });

      if (!agentInviteCode)
        throw new NotFoundException('Invite code not found');

      await agentInviteCode.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllCodesForUser(userEmail: string): Promise<AgentInviteCode[]> {
    try {
      const agentInviteCodes = await this.agentInviteCodeModel.findAll({
        where: { userEmail: userEmail },
      });

      return agentInviteCodes;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
