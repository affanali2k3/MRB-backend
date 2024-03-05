import { Request, Response } from "express";
import NotificationsRepo from "../repository/NotificationsRepo";
import { Notification } from "../model/NotificationModel";

export enum NotificationTypes {
  REFERRAL_POSTED_IN_YOUR_AREA,
  SENT_YOU_REFERRAL,
  GOT_INVITE_CODE,
  ASSOCIATION_REQUEST,
  AGREEMENT_UPDATED,
}

export interface NotificationData {
  userId: number;
  type: NotificationTypes;

  // The reference id will populate the foreign key of the notification type it is associated with
  referenceId: number;
}

class NotificationController {
  async create(req: Request, res: Response) {
    try {
      const reqBody = req.body as NotificationData;

      await NotificationsRepo.createNotification(reqBody);

      res.status(200).json({
        message: "Succesfully created notification",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to create notification",
        error: err.toString(),
      });
    }
  }
  async getAllNotifications(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const notifications: Notification[] = await NotificationsRepo.getAllNotifications({ userId: userId });

      res.status(200).json({
        message: "Succesfully retreived notifications",
        data: notifications,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Cannot get notifications",
        error: err.toString(),
      });
    }
  }
}

export default new NotificationController();
