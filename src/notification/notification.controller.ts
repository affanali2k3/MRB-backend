import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('')
  async getAllNotifications(@Query('userId') userId: string) {
    try {
      const notifications =
        await this.notificationService.getAllNotifications(+userId);
      return {
        message: 'Successfully retrieved notifications',
        data: notifications,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get notifications: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
