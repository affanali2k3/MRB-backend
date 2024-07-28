import { Module } from '@nestjs/common';
import { AgreementStatusService } from './agreement-status.service';
import { AgreementStatusController } from './agreement-status.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { AgreementModule } from 'src/agreement/agreement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AgreementStatus } from './agreement-status.model';
import { Agreement } from 'src/agreement/agreement.model';

@Module({
  imports: [
    NotificationModule,
    SequelizeModule.forFeature([AgreementStatus, Agreement]),
  ],
  controllers: [AgreementStatusController],
  providers: [AgreementStatusService],
})
export class AgreementStatusModule {}
