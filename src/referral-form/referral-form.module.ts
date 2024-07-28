import { Module } from '@nestjs/common';
import { ReferralFormService } from './referral-form.service';
import { ReferralFormController } from './referral-form.controller';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferralDirectForm } from './referral-direct-form';
import { ReferralOpenForm } from './referral-open-form';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ReferralDirectForm, ReferralOpenForm, User]),
    NotificationModule,
  ],
  controllers: [ReferralFormController],
  providers: [ReferralFormService],
})
export class ReferralFormModule {}
