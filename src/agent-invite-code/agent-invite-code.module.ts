import { Module } from '@nestjs/common';
import { AgentInviteCodeService } from './agent-invite-code.service';
import { AgentInviteCodeController } from './agent-invite-code.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AgentInviteCode } from './agent-invite-code.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([AgentInviteCode, User])],
  controllers: [AgentInviteCodeController],
  providers: [AgentInviteCodeService],
})
export class AgentInviteCodeModule {}
