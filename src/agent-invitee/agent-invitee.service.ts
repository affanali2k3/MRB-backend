import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AgentInvitee } from './agent-invitee.model';

@Injectable()
export class AgentInviteeService {
  constructor(
    @InjectModel(AgentInvitee) private agentInviteeModel: typeof AgentInvitee,
  ) {}

  async saveInvitee(inviterEmail: string, inviteeEmail: string): Promise<void> {
    try {
      const agentInvitee = this.agentInviteeModel.build({
        inviterUserEmail: inviterEmail,
        inviteeUserEmail: inviteeEmail,
      });

      await agentInvitee.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllInviteesForUser(userEmail: string): Promise<AgentInvitee[]> {
    try {
      const agentInvitees = await this.agentInviteeModel.findAll({
        where: { inviterUserEmail: userEmail },
      });

      return agentInvitees;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteInvitee(inviteId: number): Promise<void> {
    try {
      const agentInvitee = await this.agentInviteeModel.findOne({
        where: { id: inviteId },
      });

      if (!agentInvitee) throw new NotFoundException('No Invitee found');

      await agentInvitee.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
