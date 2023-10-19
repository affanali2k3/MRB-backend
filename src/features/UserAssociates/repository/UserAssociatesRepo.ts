import { User } from "../../UserProfile/model/User";
import { UserAssociates } from "../model/UserAssociates";
import { Op, Sequelize, UniqueConstraintError, literal } from "sequelize"; // Import the error class

interface IUserAssociatesRepo {
  // Sends a friend request from sender to receiver
  sendRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void>;

  // Accepts a friend request from sender to receiver
  acceptRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void>;

  // Declines a friend request from sender to receiver
  declineRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void>;

  // Cancels a friend request from sender to receiver or vice versa
  cancelRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void>;

  // Retrieves all user's associates with "Accepted" status
  getAllAssociates({ userId }: { userId: number }): Promise<User[]>;

  // Removes an associate relationship between two users
  removeAssociate({
    userId,
    associateId,
  }: {
    userId: number;
    associateId: number;
  }): Promise<void>;

  // Checks the friend request status between two users
  checkRequestStatusWithUser({
    userId,
    associateId,
  }: {
    userId: number;
    associateId: number;
  }): Promise<UserAssociates | null>;
}

export class UserAssociatesRepo implements IUserAssociatesRepo {
  async sendRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void> {
    try {
      // Check if an association already exists between sender and receiver
      const existsAssociation: UserAssociates | null =
        await UserAssociates.findOne({
          where: {
            [Op.or]: [
              { userId: senderId, associateId: receiverId },
              { userId: receiverId, associateId: senderId },
            ],
          },
        });
      if (existsAssociation !== null)
        throw new Error("Association already exists");

      // Create a new UserAssociates instance with pending status
      const newAssociation = new UserAssociates();
      newAssociation.userId = senderId;
      newAssociation.associateId = receiverId;
      newAssociation.status = "Pending";

      // Save the new association
      await UserAssociates.create({ ...newAssociation.dataValues });
    } catch (err) {
      // Handle unique constraint error (Request already sent)
      throw new Error(`${err}`);
    }
  }

  async acceptRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void> {
    try {
      // Find the association between sender and receiver
      const association = await UserAssociates.findOne({
        where: { userId: senderId, associateId: receiverId },
      });

      if (!association) throw new Error("There is no friend request");

      // Update the association's status to "Accepted"
      association.status = "Accepted";

      // Save the updated association
      await association.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async declineRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void> {
    try {
      // Find the association between sender and receiver
      const association = await UserAssociates.findOne({
        where: { userId: senderId, associateId: receiverId },
      });

      if (!association) throw new Error("There is no friend request");

      // Update the association's status to "Rejected"
      association.status = "Rejected";

      // Save the updated association
      await association.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async cancelRequest({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<void> {
    try {
      // Find the association between sender and receiver
      const association = await UserAssociates.findOne({
        where: { userId: senderId, associateId: receiverId },
      });

      if (!association) throw new Error("There is no friend request");

      // Delete the association
      await association.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getAllAssociates({ userId }: { userId: number }) {
    try {
      // Fetch all users associated with the provided user's email and with "Accepted" status
      const usersWithAcceptedAssociates = await User.findAll({
        where: {
          id: {
            [Op.in]: literal(`(
                      SELECT associate_id
                      FROM user_associates
                      WHERE user_id = '${userId}' AND association_status = 'Accepted'
                      UNION
                      SELECT user_id
                      FROM user_associates
                      WHERE associate_id = '${userId}' AND association_status = 'Accepted'
                      )
                    `),
          },
        },
      });
      return usersWithAcceptedAssociates;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async removeAssociate({
    userId,
    associateId,
  }: {
    userId: number;
    associateId: number;
  }) {
    try {
      // Find the association between the provided user emails
      const userAssociates: UserAssociates | null =
        await UserAssociates.findOne({
          where: Sequelize.or(
            { userId: userId, associateId: associateId },
            { userId: associateId, associateEmail: userId }
          ),
        });

      if (!userAssociates) throw new Error("There is no association");

      // Delete the association
      await userAssociates.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async checkRequestStatusWithUser({
    userId,
    associateId,
  }: {
    userId: number;
    associateId: number;
  }) {
    try {
      // Find the association between the provided user emails
      const userAssociates: UserAssociates | null =
        await UserAssociates.findOne({
          where: Sequelize.or(
            { userId: userId, associateId: associateId },
            { userId: associateId, associateId: userId }
          ),
        });

      if (!userAssociates) return null;

      return userAssociates;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default UserAssociatesRepo;
