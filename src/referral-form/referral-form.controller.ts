import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReferralFormService } from './referral-form.service';
import { CreateReferralFormDto } from './dto/create-referral-form.dto';

@Controller('referral-forms')
export class ReferralFormController {
  constructor(private readonly referralFormService: ReferralFormService) {}

  @Post('create')
  async createForm(@Body() dto: CreateReferralFormDto) {
    try {
      await this.referralFormService.createForm(dto);
      return { message: 'Form created successfully' };
    } catch (err: any) {
      throw new InternalServerErrorException(
        `Failed to create form: ${err.message}`,
      );
    }
  }

  @Get('get-direct-forms-sent')
  async getDirectFormsSentByUser(@Query('userId') userId: string) {
    try {
      const forms =
        await this.referralFormService.getDirectFormsSentByUser(+userId);
      return {
        message: 'Got forms successfully',
        data: forms,
      };
    } catch (err: any) {
      throw new InternalServerErrorException(
        `Failed to get forms: ${err.message}`,
      );
    }
  }

  @Get('get-open-forms-sent')
  async getOpenFormsSentByUser(@Query('userId') userId: string) {
    try {
      const forms =
        await this.referralFormService.getOpenFormsSentByUser(+userId);
      return {
        message: 'Got forms successfully',
        data: forms,
      };
    } catch (err: any) {
      throw new InternalServerErrorException(
        `Failed to get forms: ${err.message}`,
      );
    }
  }

  @Get('get-forms-received')
  async getFormsReceivedByUser(@Query('userId') userId: string) {
    try {
      const forms =
        await this.referralFormService.getFormsReceivedByUser(+userId);
      return {
        message: 'Got forms successfully',
        data: forms,
      };
    } catch (err: any) {
      throw new InternalServerErrorException(
        `Failed to get forms: ${err.message}`,
      );
    }
  }
}
