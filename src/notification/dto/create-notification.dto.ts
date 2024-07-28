import { NotificationTypes } from './notification-types.enum';

export class CreateNotificationDto {
  userId: number;
  type: NotificationTypes;
  text?: string;
  referenceId: number;
}
