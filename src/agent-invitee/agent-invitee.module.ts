import { Module } from '@nestjs/common';
import { AgentInviteeService } from './agent-invitee.service';
import { AgentInviteeController } from './agent-invitee.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { AgentInvitee } from './agent-invitee.model';

@Module({
  imports: [SequelizeModule.forFeature([AgentInvitee])],
  controllers: [AgentInviteeController],
  providers: [AgentInviteeService],
})
export class AgentInviteeModule {}
