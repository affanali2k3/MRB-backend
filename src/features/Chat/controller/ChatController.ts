import { Request, Response } from "express";
import ChatRespository from "../repository/ChatRespository";
import { Message } from "../model/MessageModel";

interface GetMessageInterface {
    userOneEmail: string,
    userTwoEmail: string,
    message: string
}

interface SaveMessageInterface {
    senderEmail: string,
    receiverEmail: string,
    message: string
}

class ChatController {

    async getAllMessages(req: Request, res: Response) {
        try {
            const data: GetMessageInterface = req.body;
            const messages: Message[] = await ChatRespository.getAllMessages({ userOneEmail: data.userOneEmail, userTwoEmail: data.userTwoEmail });
            res.status(200).json({
                message: "Messages retreived succesfully",
                data: messages
            });
        } catch (err) {
            res.status(200).json({
                message: `Failed to retreive messages ${err}`,
            });

        }
    }

    async saveMessage(req: Request, res: Response) {
        try {
            const data: SaveMessageInterface = req.body;
            await ChatRespository.saveMessage({ senderEmail: data.senderEmail, receiverEmail: data.receiverEmail, message: data.message });
            res.status(200).json({
                message: "Message saved succesfully",
            });
        } catch (err) {
            res.status(200).json({
                message: `Failed to save message ${err}`,
            });

        }
    }
}

export default new ChatController;