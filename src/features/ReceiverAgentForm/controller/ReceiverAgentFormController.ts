import { Request, Response } from "express";
import ReceiverAgentFormRepo from "../repository/ReceiverAgentFormRepo";
import { ReceiverAgentOpenForm } from "../model/ReceiverAgentOpenForm";
import { ReceiverAgentDirectForm } from "../model/ReceiverAgentDirectFormModel";
import { SenderAgentFormType } from "../../SenderAgentForm/controller/SenderAgentFormController";

// Form can be either be direct (to a specific agent) or open(to all agents)
export enum ReceiverAgentFormType {
  Direct = "direct",
  Open = "open",
}

// Define the type of incoming data from the frontend
export interface ReceiverAgentFormValues {
  receiverAgent: number;
  senderAgentFormId: number;
  formType: ReceiverAgentFormType;
  proposal: string;
}

class SenderAgentFormController {
  async getFormsProposalsReceivedByUser(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const openFormsProposalsReceivedByUser: ReceiverAgentOpenForm[] = await ReceiverAgentFormRepo.getOpenFormsProposalsReceivedByUser({
        userId: userId,
      });

      const directFormsProposalsReceivedByUser: ReceiverAgentDirectForm[] = await ReceiverAgentFormRepo.getDirectFormsProposalsReceivedByUser({
        userId: userId,
      });

      res.status(200).send({
        message: "Got proposals successfully",
        openFormsProposal: openFormsProposalsReceivedByUser,
        directFormsProposal: directFormsProposalsReceivedByUser,
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to get proposals",
        error: `${err}`,
      });
    }
  }
  async getDirectFormsProposalsReceivedByUser(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const directFormsProposalsReceivedByUser: ReceiverAgentDirectForm[] = await ReceiverAgentFormRepo.getDirectFormsProposalsReceivedByUser({
        userId: userId,
      });

      res.status(200).send({
        message: "Got proposals successfully",
        data: directFormsProposalsReceivedByUser,
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to create form",
        error: `${err}`,
      });
    }
  }

  async changeOpenFormConsideringStatus(req: Request, res: Response) {
    try {
      const receiverAgentOpenFormId: number = req.body.receiverAgentOpenFormId;
      const status: string = req.body.status;

      await ReceiverAgentFormRepo.changeOpenFormConsideringStatus({
        receiverAgentOpenFormId: receiverAgentOpenFormId,
        status: status,
      });

      res.status(200).send({
        message: "Changed form considering status succesfully",
      });
    } catch (err) {
      res.status(500).send({
        message: "Changing form considering status failed",
        error: `${err}`,
      });
    }
  }
  async rejectReceivedProposal(req: Request, res: Response) {
    try {
      const receiverAgentFormId: number = req.body.receiverAgentFormId;
      const formType: SenderAgentFormType = req.body.formType;

      await ReceiverAgentFormRepo.rejectReceivedProposal({
        receiverAgentFormId: receiverAgentFormId,
        formType: formType,
      });

      res.status(200).send({
        message: "Rejected proposal succesfully",
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to reject proposal",
        error: `${err}`,
      });
    }
  }
  async acceptReceivedProposal(req: Request, res: Response) {
    try {
      const receiverAgentFormId: number = req.body.receiverAgentFormId;
      const formType: SenderAgentFormType = req.body.formType;

      await ReceiverAgentFormRepo.acceptReceivedProposal({
        receiverAgentFormId: receiverAgentFormId,
        formType: formType,
      });

      res.status(200).send({
        message: "Accepted proposal succesfully",
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to accept proposal",
        error: `${err}`,
      });
    }
  }
  async changeDirectFormConsideringStatus(req: Request, res: Response) {
    try {
      const receiverAgentDirectFormId: number = req.body.receiverAgentDirectFormId;
      const status: string = req.body.status;

      await ReceiverAgentFormRepo.changeDirectFormConsideringStatus({
        receiverAgentDirectFormId: receiverAgentDirectFormId,
        status: status,
      });

      res.status(200).send({
        message: "Changed form considering status succesfully",
      });
    } catch (err) {
      res.status(500).send({
        message: "Changing form considering status failed",
        error: `${err}`,
      });
    }
  }

  async getOpenFormsSentByUser(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const openFormsSent: ReceiverAgentOpenForm[] = await ReceiverAgentFormRepo.getOpenFormsSent({ userId: userId });

      res.status(200).send({
        message: "Got open forms sent successfully",
        data: openFormsSent,
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to get open forms sent",
        error: `${err}`,
      });
    }
  }
  async createForm(req: Request, res: Response) {
    try {
      const reqData: ReceiverAgentFormValues = req.body;
      console.log(reqData);
      await ReceiverAgentFormRepo.createForm(reqData);

      res.status(200).send({
        message: "Form created succesfully",
      });
    } catch (err) {
      res.status(500).send({
        message: "Failed to create form",
        error: `${err}`,
      });
    }
  }
}

export default new SenderAgentFormController();
