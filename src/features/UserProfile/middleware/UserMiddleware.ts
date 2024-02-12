import auth from "../../../config/firebase";
import { Request, Response, NextFunction } from "express";
import UserRepo from "../repository/UserRepo";
import { User } from "../model/User";

class UserMiddleware {
  async verifyUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: number = req.body.id;

      const userToken: string | undefined = req.headers.authorization;

      if (!userToken)
        throw new Error("Failed to get User: No authorization token provided");

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

  async verifyUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userEmail: string = req.query.userEmail as string;
      const userToken: string | undefined = req.headers.authorization;

      if (!userToken)
        throw new Error("Failed to get user: No authorization token provided");

      const decodedIdToken = await auth.verifyIdToken(userToken);

      if (userEmail !== decodedIdToken.email) throw new Error("Access denied");

      next();
    } catch (err: any) {
      res.status(500).json({
        message: "Request Failed",
        error: err.toString(),
      });
    }
  }
}

export default new UserMiddleware();
