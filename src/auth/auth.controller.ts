import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    try {
      return await this.authService.signup(dto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.authService.login(dto);
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }
}
