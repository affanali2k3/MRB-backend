import { Request, Response } from "express";
import { User } from "../model/User";
import fs from "fs";
import path from "path";
import UserRepo from "../repository/UserRepo";

export interface UpdateUserData {
  id: number;
  photo: string;
  coverPhoto: string;
  gender: string;
  licenseNumber: string;
  licenseState: string;
  yearLicensed: number;
  address: string;
  teamMembers: number;
  biography: string;
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

  // Endpoint to delete a user
  async delete(req: Request, res: Response) {
    try {
      await UserRepo.delete(req.body.userSsn);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Cannot delete user",
      });
    }
  }

  async getUserAvatar(req: Request, res: Response) {
    try {
      const userId: string = req.query.userId as string;
      const avatarName: string = req.query.avatarName as string;

      res.sendFile(path.join("C:/Users/Affan Ali/Desktop/MRB/backend-new/master/storage/", userId, "avatar", avatarName), (err) => {
        if (!err) return;

        res.status(200).json({
          message: "Cannot get user avatar",
          error: "No cover photo exists for user",
        });
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Cannot get user avatar",
        error: err.toString(),
      });
    }
  }

  async getUserCoverPhoto(req: Request, res: Response) {
    try {
      const userId: string = req.query.userId as string;
      const coverPhotoName: string = req.query.coverPhotoName as string;

      res.sendFile(path.join("C:/Users/Affan Ali/Desktop/MRB/backend-new/master/storage/", userId, "coverPhoto", coverPhotoName), (err) => {
        if (!err) return;

        res.status(200).json({
          message: "Cannot get user avatar",
          error: "No cover photo exists for user",
        });
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Cannot get user cover photo",
        error: err.toString(),
      });
    }
  }

  // Endpoint to update user information
  async update(req: Request, res: Response) {
    try {
      const reqBody: UpdateUserData = req.body;

      console.log(req.files);

      if (req.files !== undefined) {
        if ("avatar" in req.files) {
          reqBody.photo = req.files["avatar"][0].filename;
        }
        if ("coverPhoto" in req.files) {
          reqBody.coverPhoto = req.files["coverPhoto"][0].filename;
        }
      }

      await UserRepo.update(reqBody);

      res.status(200).json({
        message: "User updated successfully",
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
