import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceController } from './user-preference.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPreference } from './user.preference.model';

@Module({
  imports: [SequelizeModule.forFeature([UserPreference])],
  controllers: [UserPreferenceController],
  providers: [UserPreferenceService],
  exports: [SequelizeModule],
})
export class UserPreferenceModule {}
