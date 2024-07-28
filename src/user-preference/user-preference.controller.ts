import {
  Controller,
  Patch,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Controller('user-preferences')
export class UserPreferenceController {
  constructor(private readonly userPreferencesService: UserPreferenceService) {}

  @Patch('update')
  async updatePreference(@Body() dto: UpdateUserPreferenceDto) {
    try {
      const userPreference =
        await this.userPreferencesService.updatePreference(dto);
      return {
        message: 'Updated preferences successfully',
        data: userPreference,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to update preferences: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get')
  async getPreferences(@Query('userId') userId: string) {
    try {
      const userPreference =
        await this.userPreferencesService.getPreference(+userId);
      return {
        message: 'Got preferences successfully',
        data: userPreference,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get preferences: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
