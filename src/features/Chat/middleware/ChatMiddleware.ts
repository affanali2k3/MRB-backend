import auth from "../../../config/firebase";
import { Request, Response, NextFunction } from "express";
import UserRepo from "../../UserProfile/repository/UserRepo";
import { User } from "../../UserProfile/model/User";

class NotificationsMiddleware {
  async getMessagesVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number = req.body.userOneId;

      const userToken: string | undefined = req.headers.authorization;

      if (!userToken) throw new Error("No authorization token provided");

      const user: User = await UserRepo.getUser(userId);

      const decodedIdToken = await auth.verifyIdToken(userToken);

      if (user.email !== decodedIdToken.email) throw new Error("Access denied");

      next();
    } catch (err: any) {
      res.status(500).json({
        message: "Request Failed",
        error: err.toString(),
      });
    }
  }

  async saveMessageVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number = req.body.senderId;

      const userToken: string | undefined = req.headers.authorization;

      if (!userToken) throw new Error("No authorization token provided");

      const user: User = await UserRepo.getUser(userId);

      const decodedIdToken = await auth.verifyIdToken(userToken);

      if (user.email !== decodedIdToken.email) throw new Error("Access denied");

      next();
    } catch (err: any) {
      res.status(500).json({
        message: "Request Failed",
        error: err.toString(),
      });
    }
  }

  async getChatsVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdString: string = req.query.userId as string; // Extract data from the request body
      const userId: number = parseInt(userIdString);

      const userToken: string | undefined = req.headers.authorization;

      if (!userToken) throw new Error("No authorization token provided");

      const user: User = await UserRepo.getUser(userId);

      const decodedIdToken = await auth.verifyIdToken(userToken);

      if (user.email !== decodedIdToken.email) throw new Error("Access denied");

      next();
    } catch (err: any) {
      res.status(500).json({
        message: "Request Failed",
        error: err.toString(),
      });
    }
  }
}

export default new NotificationsMiddleware();
