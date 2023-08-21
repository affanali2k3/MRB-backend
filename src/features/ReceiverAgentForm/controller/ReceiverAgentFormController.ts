import { Request, Response } from "express"
import ReceiverAgentFormRepo from "../repository/ReceiverAgentFormRepo";

// Form can be either be direct (to a specific agent) or open(to all agents)
export enum ReceiverAgentFormType {
    Direct = 'direct',
    Open = 'open',
}

// Define the type of incoming data from the frontend
export interface ReceiverAgentFormValues {
    receiverAgent: string,
    senderAgentFormId: number,
    formType: ReceiverAgentFormType,
    proposal: string,
}


class SenderAgentFormController {
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