import { Request, Response } from "express"
import SenderAgentFormRepo from "../repository/SenderAgentFormRepo";
import { SenderAgentDirectForm } from "../model/SenderAgentDirectForm";
import { SenderAgentOpenForm } from "../model/SenderAgentOpenForm";

// Form can be either be direct (to a specific agent) or open(to all agents)
export enum SenderAgentFormType {
    Direct = 'direct',
    Open = 'open',
}

// Define the type of incoming data from the frontend
export interface SenderAgentFormValues {
    senderAgent: number,
    receiverAgent: number,
    formType: SenderAgentFormType,
    isBuyer: boolean,
    city: string,
    state: string,
    providence: string,
    time_amount: number,
    time_unit: string,
    details: string,
    typeOfHouse: string,
    price: number
}


class SenderAgentFormController {
    async createForm(req: Request, res: Response) {
        try {
            const reqData: SenderAgentFormValues = req.body;
            console.log(reqData);
            await SenderAgentFormRepo.createForm(reqData);

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
    async getDirectFormsSentByUser(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.params.userId);
            const directFormsSent: SenderAgentDirectForm[] = await SenderAgentFormRepo.getDirectFormsSentByUser({ userId: userId });

            res.status(200).send({
                message: "Got forms succesfully",
                data: directFormsSent
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to get forms',
                error: `${err}`
            })
        }
    }
    async getOpenFormsSentByUser(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.params.userId);
            const openFormsSent: SenderAgentOpenForm[] = await SenderAgentFormRepo.getOpenFormsSentByUser({ userId: userId });

            res.status(200).send({
                message: "Got forms succesfully",
                data: openFormsSent
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to get forms',
                error: `${err}`
            })
        }
    }
    async getFormsReceivedByUser(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.params.userId);
            const formsReceived: SenderAgentDirectForm[] = await SenderAgentFormRepo.getFormsReceivedByUser({ userId: userId });

            res.status(200).send({
                message: "Got forms succesfully",
                data: formsReceived
            })
        } catch (err) {
            res.status(500).send({
                message: 'Failed to get forms',
                error: `${err}`
            })
        }
    }
}

export default new SenderAgentFormController