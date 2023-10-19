import { User } from "../../UserProfile/model/User";
import { AgentInviteCode } from "../model/AgentInviteCode";
import crypto from "crypto";

interface IAgentInviteCodeRepo {
  createCode({ userEmail }: { userEmail: string }): Promise<void>;
  shareCode({
    codeId,
    sharedEmail,
  }: {
    codeId: number;
    sharedEmail: string;
  }): Promise<void>;
  getAllCodesForUser({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<AgentInviteCode[]>;
  deleteCode({ codeId }: { codeId: number }): Promise<void>;
}

class AgentInviteCodeRepo implements IAgentInviteCodeRepo {
  async createCode({ userEmail }: { userEmail: string }): Promise<void> {
    try {
      const agentInviteCode: AgentInviteCode = new AgentInviteCode();
      agentInviteCode.code = crypto.randomBytes(16).toString("hex");
      agentInviteCode.userEmail = userEmail;

      await agentInviteCode.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async shareCode({
    codeId,
    sharedEmail,
  }: {
    codeId: number;
    sharedEmail: string;
  }): Promise<void> {
    try {
      const agentInviteCode: AgentInviteCode | null =
        await AgentInviteCode.findOne({ where: { id: codeId } });

      if (!agentInviteCode) throw new Error("Invite code not found");

      if (sharedEmail === agentInviteCode.userEmail)
        throw new Error("Cannot share code with yourself");

      if (agentInviteCode.sharedEmail !== null)
        throw new Error("Code has already been shared");

      const user = await User.findOne({ where: { email: sharedEmail } });

      if (user !== null) throw new Error("User is already on the plarform");

      agentInviteCode.sharedEmail = sharedEmail;

      await agentInviteCode.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async deleteCode({ codeId }: { codeId: number }): Promise<void> {
    try {
      const agentInviteCode: AgentInviteCode | null =
        await AgentInviteCode.findOne({ where: { id: codeId } });

      if (!agentInviteCode) throw new Error("Invite code not found");

      await agentInviteCode.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAllCodesForUser({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<AgentInviteCode[]> {
    try {
      const agentInviteCodes: AgentInviteCode[] = await AgentInviteCode.findAll(
        { where: { userEmail: userEmail } }
      );

      return agentInviteCodes;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
export default new AgentInviteCodeRepo();
