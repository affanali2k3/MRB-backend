import { Op, Sequelize } from "sequelize";
import { Message } from "../model/MessageModel";

// Define an interface for the Chat Repository
interface IChatRepo {
    getAllMessages({ userOneId, userTwoId }: { userOneId: string, userTwoId: string }): Promise<Message[]>;
    saveMessage({ senderId, receiverId, message }: { senderId: string, receiverId: string, message: string }): Promise<void>;
}

// Implement the Chat Repository interface
class ChatRepo implements IChatRepo {
    // Method to retrieve all messages between two users
    async getAllMessages({ userOneId, userTwoId }: { userOneId: string, userTwoId: string }): Promise<Message[]> {
        try {
            // Use Sequelize's findAll to get messages sent between userOne and userTwo
            const messages: Message[] = await Message.findAll({
                where: Sequelize.or(
                    { senderId: userOneId, receiverId: userTwoId },
                    { senderId: userTwoId, receiverId: userOneId }
                )
            });
            return messages;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    // Method to save a new message
    async saveMessage({ senderId, receiverId, message }: { senderId: string, receiverId: string, message: string }): Promise<void> {
        try {
            // Create a new Message instance and set its properties
            const newMessage: Message = new Message();
            newMessage.senderId = senderId;
            newMessage.receiverId = receiverId;
            newMessage.message = message;

            // Save the new message to the database
            await newMessage.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new ChatRepo; // Export an instance of the ChatRepo class
