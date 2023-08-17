import { Request, Response } from "express";
import ChatRespository from "../repository/ChatRespository"; // Import the repository handling chat-related data
import { Message } from "../model/MessageModel"; // Import the Message model

// Interface for the data required to get messages
interface GetMessageInterface {
    userOneEmail: string,
    userTwoEmail: string,
    message: string
}

// Interface for the data required to save a message
interface SaveMessageInterface {
    senderEmail: string,
    receiverEmail: string,
    message: string
}

class ChatController {

    // Method to get all messages between two users
    async getAllMessages(req: Request, res: Response) {
        try {
            const data: GetMessageInterface = req.body; // Extract data from the request body
            const messages: Message[] = await ChatRespository.getAllMessages({
                userOneEmail: data.userOneEmail,
                userTwoEmail: data.userTwoEmail
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
                senderEmail: data.senderEmail,
                receiverEmail: data.receiverEmail,
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
