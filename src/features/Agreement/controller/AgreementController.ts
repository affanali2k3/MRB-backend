import { Request, Response } from "express";
import AgreementRepo from "../repository/AgreementRepo";

export interface CreateAgreementData {
  referralSenderId: number;
  referralReceiverId: number;
}

export interface UpdateAgreementData {
  id: number;
  referralFeePercentage: number;
  statusUpdateInterval: number;
}

export interface AcceptAgreementData {
  id: number;
  agentId: number;
}

export interface StartAgreementData {
  id: number;
  agentId: number;
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
      const reqBody = req.body as UpdateAgreementData;
      await AgreementRepo.updateAgreementBySender(reqBody);

      res.status(200).json({
        message: "Agreement updated successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update agreement",
        error: err.toString(),
      });
    }
  }

  async acceptAgreementBySender(req: Request, res: Response) {
    try {
      const reqBody = req.body as AcceptAgreementData;
      await AgreementRepo.acceptAgreementBySender(reqBody);

      res.status(200).json({
        message: "Agreement accepted by sender successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to accept agreement by sender",
        error: err.toString(),
      });
    }
  }

  async acceptAgreementByReceiver(req: Request, res: Response) {
    try {
      const reqBody = req.body as AcceptAgreementData;
      await AgreementRepo.acceptAgreementByReceiver(reqBody);

      res.status(200).json({
        message: "Agreement accepted by receiver successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to accept agreement by receiver",
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
