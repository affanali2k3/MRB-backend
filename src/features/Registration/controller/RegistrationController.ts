import { Request, Response } from "express";
import RegistrationRepo from "../repository/RegistrationRepo";
import { User } from "../../UserProfile/model/User";

export interface createAccountData {
  name: string;
  email: string;
  city: string;
  state: string;
  phone: string;
}

class RegistrationController {
  async checkEmail(req: Request, res: Response) {
    try {
      const sharedEmail: string = req.body.sharedEmail;

      await RegistrationRepo.checkEmail({ sharedEmail: sharedEmail });

      res.status(200).json({
        message: "Checked email successfuly",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error checking email",
        error: err.toString(),
      });
    }
  }
  async checkReferralCode(req: Request, res: Response) {
    try {
      const referralCode: string = req.body.referralCode;
      const sharedEmail: string = req.body.sharedEmail;

      await RegistrationRepo.checkReferralCode({
        sharedEmail: sharedEmail,
        referralCode: referralCode,
      });

      res.status(200).json({
        message: "Checked code successfuly",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error checking code",
        error: err.toString(),
      });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const reqBody: createAccountData = req.body;

      const user: User = await RegistrationRepo.createUser(reqBody);

      res.status(200).json({
        message: "Created user successfuly",
        data: user,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error creating user",
        error: err.toString(),
      });
    }
  }
}

export default new RegistrationController();
