import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { NotificationData, NotificationTypes } from "../controller/NotificationController";
import { Notification } from "../model/NotificationModel";

/* Type of notifications:
1. Lead posted in your area.
2. Someone sent you a friend request.
3. You got an invite.
4. Someone sent you a lead.
5. Someone applied for your lead.
6. The lead you applied to has been accepted/rejected.
7. The person you invited has joined the platform.
8. Invited to a room.
9. Liked your post.
10. Liked your comment.
11. Commented on your post.*/

// Interface that defines the methods of the PostRepo class
interface INotificationRepo {
  createNotification(data: NotificationData): Promise<void>;
  getAllNotifications({ userId }: { userId: number }): Promise<Notification[]>;
}

class NotificationRepo implements INotificationRepo {
  async createNotification(data: NotificationData): Promise<void> {
    try {
      const notification: Notification = new Notification();

      notification.userId = data.userId;
      notification.type = data.type;

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
      throw new Error(`${err}`);
    }
  }

  async getAllNotifications({ userId }: { userId: number }): Promise<Notification[]> {
    try {
      const notifications: Notification[] = await Notification.findAll({ where: { userId: userId } });

      return notifications;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new NotificationRepo();
