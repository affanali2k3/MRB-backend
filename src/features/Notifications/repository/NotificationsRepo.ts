import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { LeadPostedNotification } from "../model/LeadPostedNotificationModel";
import { SentYouLeadNotification } from "../model/SendYouLeadNotification";
import { SentFriendRequestNotification } from "../model/SentFriendRequestNotificaiton";
import { YouGotInviteNotification } from "../model/YouGotInviteNotificationModel";

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
  createLeadPostedInYourArea({ userId }: { userId: number }): Promise<void>;
  createSentYouFriendRequest({ userId }: { userId: number }): Promise<void>;
  createYouGotInvite({ userId }: { userId: number }): Promise<void>;
  createSendYouLead({ userId }: { userId: number }): Promise<void>;
  // createAppliedForYourLead({userId}: {userId: number}): Promise<void>
  // createLeadYouAppliedStatus({userId}: {userId: number}): Promise<void>
  // createInvitedPersonJoinedPlatform({userId}: {userId: number}): Promise<void>
  // createInvitedToRoom({userId}: {userId: number}): Promise<void>
  // createLikedYourPost({userId}: {userId: number}): Promise<void>
  // createCommentedOnYourPost({userId}: {userId: number}): Promise<void>
}

class NotificationRepo implements INotificationRepo {
  // Method to save a new post with images
  async createLeadPostedInYourArea({
    userId,
    leadId,
  }: {
    userId: number;
    leadId: number;
  }): Promise<void> {
    try {
      const notification: LeadPostedNotification = new LeadPostedNotification();

      notification.userId = userId;
      notification.leadId = leadId;

      await notification.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getLeadPostedInYourArea({
    userId,
  }: {
    userId: number;
  }): Promise<LeadPostedNotification[]> {
    try {
      const notifications: LeadPostedNotification[] =
        await LeadPostedNotification.findAll({
          where: { userId: userId },
          include: [
            {
              model: SenderAgentOpenForm,
              include: [
                {
                  model: User,
                  attributes: [User.USER_NAME],
                },
              ],
            },
          ],
        });

      for (const notification of notifications) {
        notification.isRead = true;
        notification.save();
      }

      return notifications;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createSentYouFriendRequest({
    userId,
    senderId,
  }: {
    userId: number;
    senderId: number;
  }): Promise<void> {
    try {
      const notification: SentFriendRequestNotification =
        new SentFriendRequestNotification();

      notification.userId = userId;
      notification.senderId = senderId;

      await notification.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getSentYouFriendRequest({
    userId,
  }: {
    userId: number;
  }): Promise<SentFriendRequestNotification[]> {
    try {
      const notifications: SentFriendRequestNotification[] =
        await SentFriendRequestNotification.findAll({
          where: { userId: userId },
        });

      for (const notification of notifications) {
        notification.isRead = true;
        notification.save();
      }

      return notifications;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createYouGotInvite({
    userId,
    inviteId,
  }: {
    userId: number;
    inviteId: number;
  }): Promise<void> {
    try {
      const notification: YouGotInviteNotification =
        new YouGotInviteNotification();

      notification.userId = userId;
      notification.inviteId = inviteId;

      await notification.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getYouGotInvite({
    userId,
  }: {
    userId: number;
  }): Promise<YouGotInviteNotification[]> {
    try {
      const notifications: YouGotInviteNotification[] =
        await YouGotInviteNotification.findAll({ where: { userId: userId } });

      for (const notification of notifications) {
        notification.isRead = true;
        notification.save();
      }

      return notifications;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createSendYouLead({
    userId,
    leadId,
  }: {
    userId: number;
    leadId: number;
  }): Promise<void> {
    try {
      const notification: SentYouLeadNotification =
        new SentYouLeadNotification();

      notification.userId = userId;
      notification.leadId = leadId;

      await notification.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getSendYouLead({
    userId,
  }: {
    userId: number;
  }): Promise<SentYouLeadNotification[]> {
    try {
      const notifications: SentYouLeadNotification[] =
        await SentYouLeadNotification.findAll({ where: { userId: userId } });

      for (const notification of notifications) {
        notification.isRead = true;
        notification.save();
      }

      return notifications;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new NotificationRepo();
