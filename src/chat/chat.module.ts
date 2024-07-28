import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { User } from 'src/user/user.model';
import { Message } from './message.model';

@Module({
  imports: [SequelizeModule.forFeature([Chat, User, Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
