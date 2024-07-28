import { Module } from '@nestjs/common';
import { AgentToAgentReviewService } from './agent-to-agent-review.service';
import { AgentToAgentReviewController } from './agent-to-agent-review.controller';
import { AgreementModule } from 'src/agreement/agreement.module';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AgentToAgentReview } from './agent-to-agent-review.model';
import { Agreement } from 'src/agreement/agreement.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    AgreementModule,
    AgentAnalyticModule,
    SequelizeModule.forFeature([AgentToAgentReview, Agreement, AgentAnalytic]),
  ],
  controllers: [AgentToAgentReviewController],
  providers: [AgentToAgentReviewService],
})
export class AgentToAgentReviewModule {}
