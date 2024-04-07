import { WhereOptions } from "sequelize";
import { AgentInviteCode } from "../../AgentInviteCode/model/AgentInviteCode";
import { User } from "../../UserProfile/model/User";
import { CreateUserData, UpdateAccountData } from "../controller/RegistrationController";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import UserPreferences from "../../UserPreference/model/UserPreferenceModel";

interface IRegistrationRepo {
  update(data: UpdateAccountData): Promise<void>;
  createUser(data: CreateUserData): Promise<void>;
}

class RegistrationRepo implements IRegistrationRepo {
  async update(data: UpdateAccountData): Promise<void> {
    try {
      const user: User | null = await User.findOne({ where: { email: data.email } });

      if (!user) throw new Error("User does not exist");

      user.licenseNumber = data.licenseNumber;
      user.licenseState = data.licenseState;
      user.licenseYear = data.licenseYear;
      user.phone = data.phone;

      await user.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async createUser(data: CreateUserData): Promise<void> {
    try {
      const inviteCode: AgentInviteCode | null = await AgentInviteCode.findOne({
        where: { code: data.referralCode, sharedEmail: data.email },
      });

      if (!inviteCode) throw new Error("Either code or email is invalid");

      if (inviteCode.isUsed) throw new Error("Invite already used");

      const user = new User();
      user.email = data.email;
      user.name = data.name;
      user.phone = data.phone;
      user.licenseState = data.licenseState;
      user.licenseYear = data.licenseYear;
      user.licenseNumber = data.licenseNumber;

      const newUser = await user.save();

      inviteCode.isUsed = true;

      await inviteCode.save();

      const agentAnalytic: AgentAnalytic = new AgentAnalytic();

      agentAnalytic.referralsReceived = 0;
      agentAnalytic.referralsSent = 0;
      agentAnalytic.yearsOfExperience = 0;
      agentAnalytic.housesBought = 0;
      agentAnalytic.housesSold = 0;
      agentAnalytic.agentToAgentRatingNumber = 0;
      agentAnalytic.agentToAgentRatingScore = 0;
      agentAnalytic.agentToAgentRating = 0;
      agentAnalytic.userId = newUser.id;

      await agentAnalytic.save();

      const agentPreference: UserPreferences = new UserPreferences();

      agentPreference.userId = newUser.id;

      await agentPreference.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new RegistrationRepo();
