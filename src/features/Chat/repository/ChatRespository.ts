import { Op, Sequelize, WhereOptions } from "sequelize";
import { Message } from "../model/MessageModel";
import { Chat } from "../model/ChatModel";
import { User } from "../../UserProfile/model/User";

// Define an interface for the Chat Repository
interface IChatRepo {
  getAllChats({ userId }: { userId: number }): Promise<Chat[]>;
  getAllMessages({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<Message[]>;
  createChat({
    senderId,
    receiverId,
    message,
  }: {
    senderId: number;
    receiverId: number;
    message: string;
  }): Promise<void>;
  saveMessage({
    senderId,
    receiverId,
    message,
  }: {
    senderId: number;
    receiverId: number;
    message: string;
  }): Promise<void>;
}

// Implement the Chat Repository interface
class ChatRepo implements IChatRepo {
  // Method to retrieve all messages between two users
  async getAllMessages({
    senderId,
    receiverId,
  }: {
    senderId: number;
    receiverId: number;
  }): Promise<Message[]> {
    try {
      // Use Sequelize's findAll to get messages sent between userOne and userTwo
      const messages: Message[] = await Message.findAll({
        where: Sequelize.or(
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId }
        ),
      });
      return messages;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to save a new message
  async saveMessage({
    senderId,
    receiverId,
    message,
  }: {
    senderId: number;
    receiverId: number;
    message: string;
  }): Promise<void> {
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

  async createChat({
    senderId,
    receiverId,
    message,
  }: {
    senderId: number;
    receiverId: number;
    message: string;
  }): Promise<void> {
    try {
      const newChatForSender: Chat = new Chat();
      const newChatForReceiver: Chat = new Chat();

      newChatForSender.userOneId = senderId;
      newChatForReceiver.userOneId = receiverId;

      newChatForSender.userTwoId = receiverId;
      newChatForReceiver.userTwoId = senderId;

      newChatForSender.numberOfUnreadMessages = 0;
      newChatForReceiver.numberOfUnreadMessages = 1;

      newChatForSender.lastMessage = message;
      newChatForReceiver.lastMessage = message;

      newChatForSender.isRead = true;
      newChatForReceiver.isRead = false;

      await newChatForSender.save();
      await newChatForReceiver.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAllChats({ userId }: { userId: number }): Promise<Chat[]> {
    try {
      const chats: Chat[] = await Chat.findAll({
        where: { userOneId: userId },
        include: [
          {
            model: User,
            attributes: [User.USER_NAME],
          },
        ],
      });

      return chats;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new ChatRepo(); // Export an instance of the ChatRepo class
