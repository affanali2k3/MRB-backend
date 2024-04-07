import { Request, Response } from "express";
import { User } from "../model/User";
import fs from "fs";
import path from "path";
import UserRepo from "../repository/UserRepo";
import AgentAnalyticsRepo from "../../AgentAnalytics/repository/AgentAnalyticsRepo";

export interface UpdateUserData {
  id: number;
  name: string;
  photo: string;
  address: string;
  licenseNumber: string;
  licenseState: string;
  licenseYear: number;
  biography: string;
  phone: string;
}

export interface CreateUserData {
  email: string;
  name: string;
}

class UserController {
  // Endpoint to create a new user
  async create(req: Request, res: Response) {
    try {
      const reqBody = req.body as CreateUserData;

      await UserRepo.create(reqBody);
      res.status(200).json({
        message: "User created successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot create user ${err}`,
      });
    }
  }

  async getUserAvatar(req: Request, res: Response) {
    try {
      const userId: string = req.query.userId as string;
      const avatarName: string = req.query.avatarName as string;

      res.sendFile(path.join("/home/affan/Desktop/MRB/MRB-backend/storage", userId, "avatar", avatarName), (err) => {
        if (!err) return;

        res.status(200).json({
          message: "Cannot get user photo",
          error: "No photo exists for user",
        });
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Cannot get user avatar",
        error: err.toString(),
      });
    }
  }

  // Endpoint to update user information
  async update(req: Request, res: Response) {
    try {
      const reqBody: UpdateUserData = req.body;

      console.log(req.file);

      if (req.file !== undefined) {
        reqBody.photo = req.file.filename;
      }

      const user: User = await UserRepo.update(reqBody);

      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot update user because ${err}`,
      });
    }
  }

  // Endpoint to get user information by email
  async getUser(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);
      const user = await UserRepo.getUser(userId);
      let file;
      try {
        file = fs.readFileSync(user.photo);
      } catch {}

      res.status(200).json({
        message: "Got user successfully",
        data: user,
        photo: file === undefined ? null : file.toString("base64"),
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot get user ${err}`,
      });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const userEmail: string = req.query.userEmail as string;
      console.log("A");
      console.log(userEmail);
      const user = await UserRepo.getUserByEmail(userEmail);
      let file;
      try {
        file = fs.readFileSync(user.photo);
      } catch {}

      res.status(200).json({
        message: "Got user successfully",
        data: user,
        photo: file === undefined ? null : file.toString("base64"),
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot get user ${err}`,
      });
    }
  }

  // Endpoint to get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepo.getAll();
      res.status(200).json({
        message: "Got all users successfully",
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        message: "Cannot get users",
      });
    }
  }
}

export default new UserController();
