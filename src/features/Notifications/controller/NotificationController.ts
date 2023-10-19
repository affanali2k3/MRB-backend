import { Request, Response } from "express";
import { LeadPostedNotification } from "../model/LeadPostedNotificationModel";
import NotificationsRepo from "../repository/NotificationsRepo";
import { SentYouLeadNotification } from "../model/SendYouLeadNotification";
import { SentFriendRequestNotification } from "../model/SentFriendRequestNotificaiton";
import { YouGotInviteNotification } from "../model/YouGotInviteNotificationModel";
class NotificationController {
  async getAllNotifications(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const leadPostedInYourArea: LeadPostedNotification[] =
        await NotificationsRepo.getLeadPostedInYourArea({ userId: userId });
      const sentYouLead: SentYouLeadNotification[] =
        await NotificationsRepo.getSendYouLead({ userId: userId });
      const sentFriendRequest: SentFriendRequestNotification[] =
        await NotificationsRepo.getSentYouFriendRequest({ userId: userId });
      const gotInvite: YouGotInviteNotification[] =
        await NotificationsRepo.getYouGotInvite({ userId: userId });

      res.status(200).json({
        message: "Succesfully retreived notifications",
        leadPostedInYourArea: leadPostedInYourArea,
        sentYouLead: sentYouLead,
        sentFriendRequest: sentFriendRequest,
        gotInvite: gotInvite,
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
