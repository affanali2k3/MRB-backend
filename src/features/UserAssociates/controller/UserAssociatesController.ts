import { Request, Response } from "express"
import { UserAssociatesRepo } from "../repository/UserAssociatesRepo";
import { User } from "../../UserProfile/model/User";
import { UserAssociates } from "../model/UserAssociates";

interface RequestBody {
    senderEmail: string;
    receiverEmail: string;
}

interface AssociateBody {
    userEmail: string;
    associateEmail: string;
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

    async declineRequest(req: Request, res: Response) {
        try {
            const reqBody: RequestBody = req.body;
            await new UserAssociatesRepo().declineRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
            res.status(200).json({ message: `Request declined succesfully` });
        } catch (err) {
            res.status(500).send({ message: `Failed to decline request ${err}` });
        }
    }

    async cancelRequest(req: Request, res: Response) {
        try {
            const reqBody: RequestBody = req.body;
            await new UserAssociatesRepo().cancelRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
            res.status(200).json({ message: `Request cancelled succesfully` });
        } catch (err) {
            res.status(500).send({ message: `Failed to cancel request ${err}` });
        }
    }

    async getAllAssociates(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;

            const associates: User[] = await new UserAssociatesRepo().getAllAssociates({ userEmail: userEmail });
            res.status(200).json({ message: `Got associates succesfully`, data: associates });
        } catch (err) {

            res.status(500).send({ message: `Failed to get associates ${err}` });
        }
    }

    async removeAssociate(req: Request, res: Response) {
        try {
            const reqBody: AssociateBody = req.body;

            await new UserAssociatesRepo().removeAssociate({ userEmail: reqBody.userEmail, associateEmail: reqBody.associateEmail });
            res.status(200).json({ message: `Removed associate succesfully` });
        } catch (err) {

            res.status(500).send({ message: `Failed to remove associate ${err}` });
        }
    }

    async checkRequestStatusWithUser(req: Request, res: Response) {
        try {
            const reqBody: AssociateBody = req.body;

            const userAssociate: UserAssociates | null = await new UserAssociatesRepo()
                .checkRequestStatusWithUser({ userEmail: reqBody.userEmail, associateEmail: reqBody.associateEmail });
            res.status(200).json({ message: 'Got status successfully', data: userAssociate });
        } catch (err) {

            res.status(500).send({ message: `Failed to remove associate ${err}` });
        }
    }
}

export default new UserAssociatesController;