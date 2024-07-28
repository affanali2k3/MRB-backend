import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { AgreementStatusService } from './agreement-status.service';
import { CreateAgreementStatusDto } from './dto/create-agreement-status.dto';

@Controller('agreement-status')
export class AgreementStatusController {
  constructor(
    private readonly agreementStatusService: AgreementStatusService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateAgreementStatusDto) {
    try {
      await this.agreementStatusService.create(dto);
      return { message: 'Agreement status created successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('get-all')
  async getAllStatus(@Query('agreementId') agreementIdString: string) {
    try {
      const agreementId: number = parseInt(agreementIdString);
      const agreementStatus = await this.agreementStatusService.getAllStatus({
        id: agreementId,
      });
      return {
        message: 'Got agreement status successfully',
        data: agreementStatus,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
