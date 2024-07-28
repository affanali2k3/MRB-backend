import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { Message } from './message.model';
import { Chat } from './chat.model';
import { User } from 'src/user/user.model';
import { GetMessageDto } from './dto/get-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getAllMessages(dto: GetMessageDto): Promise<Message[]> {
    try {
      const messages = await this.messageModel.findAll({
        where: {
          [Op.or]: [
            { senderId: dto.userOneId, receiverId: dto.userTwoId },
            { senderId: dto.userTwoId, receiverId: dto.userOneId },
          ],
        },
      });
      return messages;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

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
      const newMessage = this.messageModel.build({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
      });

      await newMessage.save();
    } catch (err) {
      throw new BadRequestException(err.message);
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
      const newChatForSender = this.chatModel.build({
        userOneId: senderId,
        userTwoId: receiverId,
        numberOfUnreadMessages: 0,
        lastMessage: message,
        isRead: true,
      });

      const newChatForReceiver = this.chatModel.build({
        userOneId: receiverId,
        userTwoId: senderId,
        numberOfUnreadMessages: 1,
        lastMessage: message,
        isRead: false,
      });

      await newChatForSender.save();
      await newChatForReceiver.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllChats({ userId }: { userId: number }): Promise<Chat[]> {
    try {
      const chats = await this.chatModel.findAll({
        where: { userOneId: userId },
        include: [
          {
            model: this.userModel,
            attributes: ['username'],
          },
        ],
      });

      return chats;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
