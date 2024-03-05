import { Request, Response } from "express";
import AgreementRepo from "../repository/AgreementRepo";
import fs from "fs";

export interface CreateAgreementData {
  referralSenderId: number;
  referralReceiverId: number;
}

export interface UpdateSenderAgreementData {
  id: number;
  referralFeePercentage: number;
  statusUpdateInterval: number;
  senderBrokerName: string;
  senderBrokerEmail: string;
  signature: string;
}

export interface UpdateReceiverAgreementData {
  id: number;
  receiverBrokerName: string;
  receiverBrokerEmail: string;
  signature: string;
}

export interface AcceptAgreementData {
  id: number;
  agentId: number;
}

export interface StartAgreementData {
  id: number;
  agentId: number;
}

export interface BrokerSignAgreementData {
  id: number;
  signature: string;
}

export enum AgreementStatus {
  Waiting = "waiting",
  Started = "started",
  Closed = "closed",
}

class AgreementController {
  async createAgreement(req: Request, res: Response) {
    try {
      const reqBody = req.body as CreateAgreementData;
      await AgreementRepo.createAgreement(reqBody);

      res.status(200).json({
        message: "Agreement created successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to create agreement",
        error: err.toString(),
      });
    }
  }

  async updateAgreementBySender(req: Request, res: Response) {
    try {
      const reqBody = req.body as UpdateSenderAgreementData;

      if (!req.file) throw new Error("No signature provided");

      reqBody.signature = req.file.path;

      await AgreementRepo.updateAgreementBySender(reqBody);

      res.status(200).json({
        message: "Agreement updated successfully",
      });
    } catch (err: any) {
      // Delete the uploaded signature through multer if request fails for some reason
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error while deleting the file", err);
          }
        });
      }
      res.status(500).json({
        message: "Failed to update agreement",
        error: err.toString(),
      });
    }
  }

  async updateAgreementByReceiver(req: Request, res: Response) {
    try {
      const reqBody = req.body as UpdateReceiverAgreementData;

      if (!req.file) throw new Error("No signature provided");

      reqBody.signature = req.file.path;

      await AgreementRepo.updateAgreementByReceiver(reqBody);

      res.status(200).json({
        message: "Agreement updated successfully",
      });
    } catch (err: any) {
      // Delete the uploaded signature through multer if request fails for some reason
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error while deleting the file", err);
          }
        });
      }
      res.status(500).json({
        message: "Failed to update agreement",
        error: err.toString(),
      });
    }
  }

  // async acceptAgreementBySender(req: Request, res: Response) {
  //   try {
  //     const reqBody = req.body as AcceptAgreementData;
  //     await AgreementRepo.acceptAgreementBySender(reqBody);

  //     res.status(200).json({
  //       message: "Agreement accepted by sender successfully",
  //     });
  //   } catch (err: any) {
  //     res.status(500).json({
  //       message: "Failed to accept agreement by sender",
  //       error: err.toString(),
  //     });
  //   }
  // }

  // async acceptAgreementByReceiver(req: Request, res: Response) {
  //   try {
  //     const reqBody = req.body as AcceptAgreementData;
  //     await AgreementRepo.acceptAgreementByReceiver(reqBody);

  //     res.status(200).json({
  //       message: "Agreement accepted by receiver successfully",
  //     });
  //   } catch (err: any) {
  //     res.status(500).json({
  //       message: "Failed to accept agreement by receiver",
  //       error: err.toString(),
  //     });
  //   }
  // }

  async senderBrokerSignAgreement(req: Request, res: Response) {
    try {
      const reqBody = req.body as BrokerSignAgreementData;

      if (!req.file) throw new Error("No signature provided");

      reqBody.signature = req.file.path;

      await AgreementRepo.senderBrokerSignAgreement(reqBody);

      res.status(200).json({
        message: "Agreement signed by sender broker successfully",
      });
    } catch (err: any) {
      // Delete the uploaded signature through multer if request fails for some reason
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error while deleting the file", err);
          }
        });
      }

      res.status(500).json({
        message: "Failed to sign agreement by sender broker",
        error: err.toString(),
      });
    }
  }
  async receiverBrokerSignAgreement(req: Request, res: Response) {
    try {
      const reqBody = req.body as BrokerSignAgreementData;

      if (!req.file) throw new Error("No signature provided");

      reqBody.signature = req.file.path;

      await AgreementRepo.receiverBrokerSignAgreement(reqBody);

      res.status(200).json({
        message: "Agreement signed by receiver broker successfully",
      });
    } catch (err: any) {
      // Delete the uploaded signature through multer if request fails for some reason
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error while deleting the file", err);
          }
        });
      }
      res.status(500).json({
        message: "Failed to sign agreement by receiver broker",
        error: err.toString(),
      });
    }
  }
  async startAgreement(req: Request, res: Response) {
    try {
      const reqBody = req.body as AcceptAgreementData;
      await AgreementRepo.startAgreement(reqBody);

      res.status(200).json({
        message: "Agreement started successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to start agreement",
        error: err.toString(),
      });
    }
  }
}

export default new AgreementController();
