import { Request, Response } from "express";
import RegistrationRepo from "../repository/RegistrationRepo";

export interface UpdateAccountData {
  email: string;
  phone: string;
  licenseState: string;
  licenseNumber: string;
  licenseYear: number;
}
export interface CreateUserData {
  email: string;
  name: string;
  code: string;
}

class RegistrationController {
  async update(req: Request, res: Response) {
    try {
      const reqBody = req.body as UpdateAccountData;

      await RegistrationRepo.update(reqBody);

      res.status(200).json({
        message: "Updated user succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update user",
        error: err.toString(),
      });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const reqBody = req.body as CreateUserData;

      await RegistrationRepo.createUser(reqBody);

      res.status(200).json({
        message: "Created user succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to create user",
        error: err.toString(),
      });
    }
  }
}

export default new RegistrationController();
