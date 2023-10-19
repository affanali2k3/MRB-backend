import { AgentInvitee } from "../model/AgentInviteeModel";

interface IAgentInviteeRepo {
  saveInvitee({
    inviterEmail,
    inviteeEmail,
  }: {
    inviterEmail: string;
    inviteeEmail: string;
  }): Promise<void>;
  getAllInviteesForUser({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<AgentInvitee[]>;
  deleteInvitee({ inviteId }: { inviteId: number }): Promise<void>;
}

class AgentInviteeRepo implements IAgentInviteeRepo {
  async saveInvitee({
    inviterEmail,
    inviteeEmail,
  }: {
    inviterEmail: string;
    inviteeEmail: string;
  }): Promise<void> {
    try {
      const agentInvitee: AgentInvitee = new AgentInvitee();
      agentInvitee.inviterUserEmail = inviterEmail;
      agentInvitee.inviteeUserEmail = inviterEmail;

      await agentInvitee.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAllInviteesForUser({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<AgentInvitee[]> {
    try {
      const agentInvitees: AgentInvitee[] = await AgentInvitee.findAll({
        where: { inviterUserEmail: userEmail },
      });

      return agentInvitees;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async deleteInvitee({ inviteId }: { inviteId: number }): Promise<void> {
    try {
      const agentInvitee: AgentInvitee | null = await AgentInvitee.findOne({
        where: { id: inviteId },
      });

      if (!agentInvitee) throw new Error("No Invitee found");

      await agentInvitee.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
export default new AgentInviteeRepo();
