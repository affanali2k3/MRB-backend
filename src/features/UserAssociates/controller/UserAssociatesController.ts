import { Request, Response } from "express";
import UserAssociatesRepo from "../repository/UserAssociatesRepo"; // Assuming you have imported the correct path
import { User } from "../../UserProfile/model/User";
import { UserAssociates } from "../model/UserAssociates";

export enum AssociationStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
}
interface RequestBody {
  senderId: number;
  receiverId: number;
}

interface AssociateBody {
  userId: number;
  associateId: number;
}

class UserAssociatesController {
  // Endpoint to send a connection request
  async sendRequest(req: Request, res: Response) {
    try {
      const reqBody: RequestBody = req.body;

      if (reqBody.senderId === reqBody.receiverId) throw new Error("Cannot be associate with yourself");

      await new UserAssociatesRepo().sendRequest({
        senderId: reqBody.senderId,
        receiverId: reqBody.receiverId,
      });
      res.status(200).json({ message: `Request sent successfully` });
    } catch (err) {
      res.status(500).send({ message: `Failed to send request ${err}` });
    }
  }

  // Endpoint to accept a connection request
  async acceptRequest(req: Request, res: Response) {
    try {
      const reqBody: RequestBody = req.body;

      await new UserAssociatesRepo().acceptRequest({
        senderId: reqBody.senderId,
        receiverId: reqBody.receiverId,
      });
      res.status(200).json({ message: `Request accepted successfully` });
    } catch (err) {
      res.status(500).send({ message: `Failed to accept request ${err}` });
    }
  }

  // Endpoint to decline a connection request
  async declineRequest(req: Request, res: Response) {
    try {
      const reqBody: RequestBody = req.body;
      await new UserAssociatesRepo().declineRequest({
        senderId: reqBody.senderId,
        receiverId: reqBody.receiverId,
      });
      res.status(200).json({ message: `Request declined successfully` });
    } catch (err) {
      res.status(500).send({ message: `Failed to decline request ${err}` });
    }
  }

  // Endpoint to cancel a connection request
  async cancelRequest(req: Request, res: Response) {
    try {
      const reqBody: RequestBody = req.body;
      await new UserAssociatesRepo().cancelRequest({
        senderId: reqBody.senderId,
        receiverId: reqBody.receiverId,
      });
      res.status(200).json({ message: `Request cancelled successfully` });
    } catch (err) {
      res.status(500).send({ message: `Failed to cancel request ${err}` });
    }
  }

  // Endpoint to get all associates of a user
  async getAllAssociates(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const associates: User[] = await new UserAssociatesRepo().getAllAssociates({ userId: userId });
      res.status(200).json({ message: `Got associates successfully`, data: associates });
    } catch (err) {
      res.status(500).send({ message: `Failed to get associates ${err}` });
    }
  }

  // Endpoint to remove an associate
  async removeAssociate(req: Request, res: Response) {
    try {
      const reqBody: AssociateBody = req.body;
      await new UserAssociatesRepo().removeAssociate({
        userId: reqBody.userId,
        associateId: reqBody.associateId,
      });
      res.status(200).json({ message: `Removed associate successfully` });
    } catch (err) {
      res.status(500).send({ message: `Failed to remove associate ${err}` });
    }
  }

  // Endpoint to check connection request status with a user
  async checkRequestStatusWithUser(req: Request, res: Response) {
    try {
      const reqBody: AssociateBody = req.body;
      const userAssociate: UserAssociates | null = await new UserAssociatesRepo().checkRequestStatusWithUser({
        userId: reqBody.userId,
        associateId: reqBody.associateId,
      });
      res.status(200).json({ message: "Got status successfully", data: userAssociate });
    } catch (err) {
      res.status(500).send({ message: `Failed to get request status ${err}` });
    }
  }
}

export default new UserAssociatesController();
