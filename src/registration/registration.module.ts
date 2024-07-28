import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { AgentInviteCodeModule } from 'src/agent-invite-code/agent-invite-code.module';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { AgentInviteCode } from 'src/agent-invite-code/agent-invite-code.model';
import { UserPreference } from 'src/user-preference/user.preference.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      AgentAnalytic,
      AgentInviteCode,
      UserPreference,
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
