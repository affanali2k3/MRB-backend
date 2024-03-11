import { WhereOptions } from "sequelize";
import { AgentInviteCode } from "../../AgentInviteCode/model/AgentInviteCode";
import { User } from "../../UserProfile/model/User";
import { CreateUserData, UpdateAccountData } from "../controller/RegistrationController";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";

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
      user.licenceState = data.licenseState;
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
        where: { code: data.code, sharedEmail: data.email },
      });

      if (!inviteCode) throw new Error("Either code or email is invalid");

      if (inviteCode.isUsed) throw new Error("Invite already used");

      const user = new User();
      user.email = data.email;
      user.name = data.name;

      await user.save();

      inviteCode.isUsed = true;

      await inviteCode.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new RegistrationRepo();
