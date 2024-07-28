import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notification.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationTypes } from './dto/notification-types.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification) private notificationModel: typeof Notification,
  ) {}

  async createNotification(data: CreateNotificationDto): Promise<void> {
    try {
      const notification = this.notificationModel.build({
        userId: data.userId,
        type: data.type,
        text: data.text,
      });

      if (data.type === NotificationTypes.ASSOCIATION_REQUEST) {
        notification.assocationRequestId = data.referenceId;
      } else if (data.type === NotificationTypes.GOT_INVITE_CODE) {
        notification.gotInviteId = data.referenceId;
      } else if (data.type === NotificationTypes.REFERRAL_POSTED_IN_YOUR_AREA) {
        notification.referralPostedId = data.referenceId;
      } else if (data.type === NotificationTypes.SENT_YOU_REFERRAL) {
        notification.referralReceivedId = data.referenceId;
      } else if (data.type === NotificationTypes.AGREEMENT_UPDATED) {
        notification.agreementUpdatedId = data.referenceId;
      }

      await notification.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllNotifications(userId: number): Promise<Notification[]> {
    try {
      const notifications = await this.notificationModel.findAll({
        where: { userId: userId },
      });

      return notifications;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
