import { Module } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { AgreementController } from './agreement.controller';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agreement } from './agreement.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    NotificationModule,
    SequelizeModule.forFeature([Agreement, AgentAnalytic]),
  ],
  controllers: [AgreementController],
  providers: [AgreementService],
  exports: [AgreementService],
})
export class AgreementModule {}
