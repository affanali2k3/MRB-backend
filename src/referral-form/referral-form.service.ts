import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReferralDirectForm } from './referral-direct-form';
import { ReferralOpenForm } from './referral-open-form';
import { User } from 'src/user/user.model';
import { CreateReferralFormDto } from './dto/create-referral-form.dto';
import { ReferralFormType } from './dto/referral-form-types.enum';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { NotificationTypes } from 'src/notification/dto/notification-types.enum';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Injectable()
export class ReferralFormService {
  constructor(
    @InjectModel(ReferralDirectForm)
    private referralDirectFormModel: typeof ReferralDirectForm,
    @InjectModel(ReferralOpenForm)
    private referralOpenFormModel: typeof ReferralOpenForm,
    @InjectModel(User) private userModel: typeof User,
    private readonly notificationService: NotificationService,
  ) {}

  async getDirectFormsSentByUser(
    userId: number,
  ): Promise<ReferralDirectForm[]> {
    try {
      const formsSent = await this.referralDirectFormModel.findAll({
        where: { senderAgentId: userId },
      });
      return formsSent;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getOpenFormsSentByUser(userId: number): Promise<ReferralOpenForm[]> {
    try {
      const formsSentToPublic = await this.referralOpenFormModel.findAll({
        where: { senderAgent: userId },
      });
      return formsSentToPublic;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getFormsReceivedByUser(userId: number): Promise<ReferralDirectForm[]> {
    try {
      const formsReceived = await this.referralDirectFormModel.findAll({
        where: { receiverAgentId: userId },
        include: [
          {
            model: User,
            as: ReferralDirectForm.SENDER_AGENT,
            include: [
              {
                model: AgentAnalytic,
              },
            ],
          },
        ],
      });
      return formsReceived;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createForm(dto: CreateReferralFormDto): Promise<void> {
    try {
      if (dto.formType === ReferralFormType.Direct) {
        if (dto.senderAgent === dto.receiverAgent)
          throw new BadRequestException('Cannot share form with yourself');

        const senderAgentDirectForm = this.referralDirectFormModel.build({
          senderAgentId: dto.senderAgent,
          isBuyer: dto.isBuyer,
          receiverAgentId: dto.receiverAgent,
          city: dto.city,
          state: dto.state,
          timeAmount: dto.timeAmount,
          details: dto.details,
          typeOfHouse: dto.typeOfHouse,
          providence: dto.providence,
          price: dto.price,
        });

        await senderAgentDirectForm.save();
      } else if (dto.formType === ReferralFormType.Open) {
        console.log(dto);
        console.log(dto.senderAgent);
        const senderAgentOpenForm = this.referralOpenFormModel.build({
          senderAgentId: dto.senderAgent,
          isBuyer: dto.isBuyer,
          city: dto.city,
          state: dto.state,
          timeAmount: dto.timeAmount,
          details: dto.details,
          typeOfHouse: dto.typeOfHouse,
          providence: dto.providence,
          price: dto.price,
        });

        const createdSenderAgentOpenForm = await senderAgentOpenForm.save();
        console.log(createdSenderAgentOpenForm);

        const users = await this.userModel.findAll({
          where: { licenseState: senderAgentOpenForm.state },
        });

        for (const user of users) {
          const notificationData: CreateNotificationDto = {
            userId: user.id,
            type: NotificationTypes.REFERRAL_POSTED_IN_YOUR_AREA,
            referenceId: createdSenderAgentOpenForm.id,
          };

          await this.notificationService.createNotification(notificationData);
        }
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
