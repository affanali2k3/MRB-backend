import { Module } from '@nestjs/common';
import { ReferralCentreService } from './referral-centre.service';
import { ReferralCentreController } from './referral-centre.controller';
import { UserModule } from 'src/user/user.module';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { User } from 'src/user/user.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ReferralOpenForm, User, AgentAnalytic]),
  ],
  controllers: [ReferralCentreController],
  providers: [ReferralCentreService],
})
export class ReferralCentreModule {}
