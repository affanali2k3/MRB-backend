import { WhereOptions } from "sequelize";
import { AgentInviteCode } from "../../AgentInviteCode/model/AgentInviteCode";
import { User } from "../../UserProfile/model/User";
import { createAccountData } from "../controller/RegistrationController";
import { UsedInviteeCode } from "../../AgentInviteCode/model/UsedInviteeCode";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";

interface IRegistrationRepo {
  checkEmail({ sharedEmail }: { sharedEmail: string }): Promise<void>;
  checkReferralCode({
    sharedEmail,
    referralCode,
  }: {
    sharedEmail: string;
    referralCode: string;
  }): Promise<void>;
  createUser(data: createAccountData): Promise<User>;
}

class RegistrationRepo implements IRegistrationRepo {
  async checkEmail({ sharedEmail }: { sharedEmail: string }): Promise<void> {
    try {
      const whereOptions: WhereOptions<AgentInviteCode> = {
        sharedEmail: sharedEmail,
      };
      const exists: AgentInviteCode | null = await AgentInviteCode.findOne({
        where: whereOptions,
      });

      if (!exists) throw new Error("This email has not been invited");
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async checkReferralCode({
    sharedEmail,
    referralCode,
  }: {
    sharedEmail: string;
    referralCode: string;
  }): Promise<void> {
    try {
      const whereOptions: WhereOptions<AgentInviteCode> = {
        sharedEmail: sharedEmail,
        code: referralCode,
      };

      const exists: AgentInviteCode | null = await AgentInviteCode.findOne({
        where: whereOptions,
      });

      if (!exists) throw new Error("Invalid code");

      const usedCode: UsedInviteeCode = new UsedInviteeCode();

      usedCode.code = exists.code;
      usedCode.sharedEmail = exists.sharedEmail;
      usedCode.userEmail = exists.userEmail;

      exists.destroy();

      usedCode.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createUser(data: createAccountData): Promise<User> {
    try {
      const user: User = new User();

      const usedCode: UsedInviteeCode | null = await UsedInviteeCode.findOne({
        where: { sharedEmail: data.email },
      });

      if (!usedCode)
        throw new Error("Cannot create account as it is not verified");

      user.name = data.name;
      user.email = data.email;
      user.phone = data.phone;

      const savedUser = await user.save();

      const agentAnalytic: AgentAnalytic = new AgentAnalytic();

      agentAnalytic.referralsReceived = 0;
      agentAnalytic.referralsSent = 0;
      agentAnalytic.agentToAgentRatingNumber = 0;
      agentAnalytic.agentToAgentRatingScore = 0;
      agentAnalytic.agentToAgentRating = 0;
      agentAnalytic.clientToAgentRating = 0;
      agentAnalytic.clientToAgentRatingNumber = 0;
      agentAnalytic.clientToAgentRatingScore = 0;
      agentAnalytic.userId = savedUser.id;

      await agentAnalytic.save();

      return user;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new RegistrationRepo();
