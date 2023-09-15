import { Request, Response } from "express";
import ChatRespository from "../repository/ChatRespository"; // Import the repository handling chat-related data
import { Message } from "../model/MessageModel"; // Import the Message model

// Interface for the data required to get messages
interface GetMessageInterface {
    userOneId: number,
    userTwoId: number,
    message: string
}

// Interface for the data required to save a message
interface SaveMessageInterface {
    senderId: number,
    receiverId: number,
    message: string
}

class ChatController {

    // Method to get all messages between two users
    async getAllMessages(req: Request, res: Response) {
        try {
            const data: GetMessageInterface = req.body; // Extract data from the request body
            const messages: Message[] = await ChatRespository.getAllMessages({
                userOneId: data.userOneId,
                userTwoId: data.userTwoId
            }); // Call the repository method to get messages
            res.status(200).json({
                message: "Messages retrieved successfully",
                data: messages
            }); // Respond with the retrieved messages
        } catch (err) {
            res.status(200).json({
                message: `Failed to retrieve messages ${err}`,
            }); // Handle errors when retrieving messages
        }
    }

    // Method to save a new message
    async saveMessage(req: Request, res: Response) {
        try {
            const data: SaveMessageInterface = req.body; // Extract data from the request body
            await ChatRespository.saveMessage({
                senderId: data.senderId,
                receiverId: data.receiverId,
                message: data.message
            }); // Call the repository method to save the message
            res.status(200).json({
                message: "Message saved successfully",
            }); // Respond with success message after saving the message
        } catch (err) {
            res.status(200).json({
                message: `Failed to save message ${err}`,
            }); // Handle errors when saving a message
        }
    }
}

export default new ChatController; // Export an instance of the ChatController class
