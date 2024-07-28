import { Module } from '@nestjs/common';
import { ProposalFormService } from './proposal-form.service';
import { ProposalFormController } from './proposal-form.controller';
import { UserModule } from 'src/user/user.module';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { AgreementModule } from 'src/agreement/agreement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProposalOpenForm } from './proposal-open-form.model';
import { ProposalDirectForm } from './proposal-close-form.model';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { ReferralDirectForm } from 'src/referral-form/referral-direct-form';
import { User } from 'src/user/user.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ProposalOpenForm,
      ProposalDirectForm,
      ReferralOpenForm,
      ReferralDirectForm,
      User,
      AgentAnalytic,
    ]),
    AgentAnalyticModule,
    AgreementModule,
  ],
  controllers: [ProposalFormController],
  providers: [ProposalFormService],
})
export class ProposalFormModule {}
