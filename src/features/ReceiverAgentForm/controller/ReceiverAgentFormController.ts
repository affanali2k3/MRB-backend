import { Request, Response } from "express"
import ReceiverAgentFormRepo from "../repository/ReceiverAgentFormRepo";
import { ReceiverAgentOpenForm } from "../model/ReceiverAgentOpenForm";
import { ReceiverAgentDirectForm } from "../model/ReceiverAgentDirectFormModel";

// Form can be either be direct (to a specific agent) or open(to all agents)
export enum ReceiverAgentFormType {
    Direct = 'direct',
    Open = 'open',
}

// Define the type of incoming data from the frontend
export interface ReceiverAgentFormValues {
    receiverAgent: number,
    senderAgentFormId: number,
    formType: ReceiverAgentFormType,
    proposal: string,
}


class SenderAgentFormController {
    async getOpenFormsProposalsReceivedByUser(req: Request, res: Response) {
        try {
            const userIdString: string = req.query.userId as string;
            const userId: number = parseInt(userIdString);

            const openFormsProposalsReceivedByUser: ReceiverAgentOpenForm[] = 
            await ReceiverAgentFormRepo.getOpenFormsProposalsReceivedByUser({userId: userId});

            res.status(200).send({
                message: "Got proposals successfully",
                data: openFormsProposalsReceivedByUser
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to get proposals',
                error: `${err}`
            })
        }
    }
    async getDirectFormsProposalsReceivedByUser(req: Request, res: Response) {
        try {
            const userIdString: string = req.query.userId as string;
            const userId: number = parseInt(userIdString);

            const directFormsProposalsReceivedByUser: ReceiverAgentDirectForm[] = 
            await ReceiverAgentFormRepo.getDirectFormsProposalsReceivedByUser({userId: userId});

            res.status(200).send({
                message: "Got proposals successfully",
                data: directFormsProposalsReceivedByUser
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to create form',
                error: `${err}`
            })
        }
    }
    async getOpenFormsSentByUser(req: Request, res: Response) {
        try {
            const userIdString: string = req.query.userId as string;
            const userId: number = parseInt(userIdString);

            const openFormsSent: ReceiverAgentOpenForm[] = 
            await ReceiverAgentFormRepo.getOpenFormsSent({userId: userId});

            res.status(200).send({
                message: "Got open forms sent successfully",
                data: openFormsSent
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to get open forms sent',
                error: `${err}`
            })
        }
    }
    async createForm(req: Request, res: Response) {
        try {
            const reqData: ReceiverAgentFormValues = req.body;
            console.log(reqData);
            await ReceiverAgentFormRepo.createForm(reqData);

            res.status(200).send({
                message: "Form created succesfully",
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to create form',
                error: `${err}`
            })
        }
    }
}

export default new SenderAgentFormController