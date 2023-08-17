import { Op, Sequelize } from "sequelize";
import { Message } from "../model/MessageModel";


interface IChatRepo {
    getAllMessages({ userOneEmail, userTwoEmail }: { userOneEmail: string, userTwoEmail: string; }): Promise<Message[]>;
    saveMessage({ senderEmail, receiverEmail, message }: { senderEmail: string, receiverEmail: string, message: string }): Promise<void>;
}

class ChatRepo implements IChatRepo {
    async getAllMessages({ userOneEmail, userTwoEmail }: { userOneEmail: string, userTwoEmail: string; }): Promise<Message[]> {
        try {

            const messages: Message[] = await Message.findAll({
                where: Sequelize.or({ senderEmail: userOneEmail, receiverEmail: userTwoEmail },
                    { senderEmail: userTwoEmail, receiverEmail: userOneEmail })
            })
            return messages;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async saveMessage({ senderEmail, receiverEmail, message }: { senderEmail: string, receiverEmail: string, message: string }): Promise<void> {
        try {
            const newMessage: Message = new Message();

            newMessage.senderEmail = senderEmail;
            newMessage.receiverEmail = receiverEmail;
            newMessage.message = message;

            await newMessage.save();

        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new ChatRepo;