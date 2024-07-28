import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { AgentInviteCode } from 'src/agent-invite-code/agent-invite-code.model';
import { UserPreference } from 'src/user-preference/user.preference.model';
import { User } from 'src/user/user.model';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(AgentInviteCode)
    private agentInviteCodeModel: typeof AgentInviteCode,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
    @InjectModel(UserPreference)
    private userPreferencesModel: typeof UserPreference,
  ) {}

  async update(data: UpdateRegistrationDto): Promise<void> {
    try {
      const user = await this.userModel.findOne({
        where: { email: data.email },
      });

      if (!user) throw new NotFoundException('User does not exist');

      user.licenseNumber = data.licenseNumber;
      user.licenseState = data.licenseState;
      user.licenseYear = data.licenseYear;
      user.phone = data.phone;

      await user.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createUser(data: CreateRegistrationDto): Promise<void> {
    try {
      const inviteCode = await this.agentInviteCodeModel.findOne({
        where: { code: data.referralCode, sharedEmail: data.email },
      });

      if (!inviteCode)
        throw new BadRequestException('Either code or email is invalid');

      if (inviteCode.isUsed)
        throw new BadRequestException('Invite already used');

      const user = this.userModel.build({
        email: data.email,
        name: data.name,
        phone: data.phone,
        licenseState: data.licenseState,
        licenseYear: data.licenseYear,
        licenseNumber: data.licenseNumber,
      });

      const newUser = await user.save();

      inviteCode.isUsed = true;
      await inviteCode.save();

      const agentAnalytic = this.agentAnalyticModel.build({
        referralsReceived: 0,
        referralsSent: 0,
        yearsOfExperience: 0,
        housesBought: 0,
        housesSold: 0,
        agentToAgentRatingNumber: 0,
        agentToAgentRatingScore: 0,
        agentToAgentRating: 0,
        userId: newUser.id,
      });

      await agentAnalytic.save();

      const agentPreference = this.userPreferencesModel.build({
        userId: newUser.id,
      });

      await agentPreference.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
