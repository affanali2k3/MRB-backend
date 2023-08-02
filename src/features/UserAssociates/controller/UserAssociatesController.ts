import { Request, Response } from "express"
import { UserAssociatesRepo } from "../repository/UserAssociatesRepo";

interface RequestBody {
    senderEmail: string;
    receiverEmail: string;
}


class UserAssociatesController {
    async sendRequest(req: Request, res: Response) {
        try {
            const reqBody: RequestBody = req.body;
            await new UserAssociatesRepo().sendRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
            res.status(200).json({ message: `Request sent succesfully` });
        } catch (err) {
            res.status(500).send({ message: `Failed to send request ${err}` });
        }
    }

    async acceptRequest(req: Request, res: Response) {
        try {
            const reqBody: RequestBody = req.body;
            await new UserAssociatesRepo().acceptRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
            res.status(200).json({ message: `Request accepted succesfully` });
        } catch (err) {
            res.status(500).send({ message: `Failed to accept request ${err}` });
        }
    }

    async declineRequest() { }

    async cancelRequest() { }
}

export default new UserAssociatesController;