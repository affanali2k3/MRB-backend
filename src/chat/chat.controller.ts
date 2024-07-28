import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-chat.dto';
import { GetMessageDto } from './dto/get-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('save')
  async saveMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      await this.chatService.saveMessage(createMessageDto);
      return { message: 'Message saved successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to save message ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('getAll')
  async getAllMessages(@Body() getMessageDto: GetMessageDto) {
    try {
      const messages = await this.chatService.getAllMessages(getMessageDto);
      return {
        message: 'Messages retrieved successfully',
        data: messages,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to retrieve messages ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('chat/get-all')
  async getAllChats(@Query('userId') userIdString: string) {
    try {
      const userId = parseInt(userIdString);
      const chats = await this.chatService.getAllChats({ userId });
      return {
        message: 'Got chats successfully',
        data: chats,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get chats ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('chat/create')
  async createChat(@Body() createMessageDto: CreateMessageDto) {
    try {
      await this.chatService.createChat(createMessageDto);
      return { message: 'Created chat successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to create chat ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
