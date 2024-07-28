import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserPreference } from './user.preference.model';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference)
    private userPreferencesModel: typeof UserPreference,
  ) {}

  async createPreference(userId: number): Promise<void> {
    try {
      const userPreference = this.userPreferencesModel.build({
        userId: userId,
      });

      await userPreference.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getPreference(userId: number): Promise<UserPreference> {
    try {
      const userPreference = await this.userPreferencesModel.findOne({
        where: { userId: userId },
      });

      if (!userPreference)
        throw new NotFoundException('User Preference not found');

      return userPreference;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updatePreference(
    dto: UpdateUserPreferenceDto,
  ): Promise<UserPreference> {
    try {
      const userPreference = await this.userPreferencesModel.findOne({
        where: { userId: dto.userId },
      });

      if (!userPreference)
        throw new NotFoundException('User Preference not found');

      userPreference.state = dto.state;
      userPreference.city = dto.city;
      userPreference.clientType = dto.clientType;
      userPreference.houseType = dto.houseType;
      userPreference.maxCost = dto.maxCost;
      userPreference.minCost = dto.minCost;
      userPreference.maxTimeAmount = dto.maxTimeAmount;
      userPreference.minTimeAmount = dto.minTimeAmount;

      const savedPreference = await userPreference.save();

      return savedPreference;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
