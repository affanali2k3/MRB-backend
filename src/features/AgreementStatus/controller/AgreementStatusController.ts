import { Request, Response } from "express";
import AgreementStatusRepo from "../repository/AgreementStatusRepo";
import { AgreementStatus } from "../model/AgreementStatusModel";

export interface CreateAgreementStatusData {
  agreementId: number;
  status: string;
}

export interface GetAgreementStatusData {
  id: number;
}

class AgreementStatusController {
  async create(req: Request, res: Response) {
    try {
      const reqBody = req.body as CreateAgreementStatusData;
      await AgreementStatusRepo.create(reqBody);

      res.status(200).json({
        message: "Agreement status created successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to create agreement status",
        error: err.toString(),
      });
    }
  }

  async getAllStatus(req: Request, res: Response) {
    try {
      const agreementIdString: string = req.query.agreementId as string;
      const agreementId: number = parseInt(agreementIdString);

      const agreementStatus: AgreementStatus[] = await AgreementStatusRepo.getAllStatus({
        id: agreementId,
      });

      res.status(200).json({
        message: "Got agreement status successfully",
        data: agreementStatus,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to get agreement status",
        error: err.toString(),
      });
    }
  }
}

export default new AgreementStatusController();
