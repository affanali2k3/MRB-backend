import {
  Controller,
  Patch,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Patch('update')
  async update(@Body() updateAccountDto: UpdateRegistrationDto) {
    try {
      await this.registrationService.update(updateAccountDto);
      return { message: 'Updated user successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to update user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateRegistrationDto) {
    try {
      await this.registrationService.createUser(createUserDto);
      return { message: 'Created user successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to create user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
