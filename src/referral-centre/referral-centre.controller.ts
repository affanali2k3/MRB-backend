import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReferralCentreService } from './referral-centre.service';
import { SearchForLeadsDto } from './dto/create-referral-centre.dto';

@Controller('referral-center')
export class ReferralCentreController {
  constructor(private readonly referralCenterService: ReferralCentreService) {}

  @Get('search')
  async searchForLeads(@Query() filtersSearchDataDto: SearchForLeadsDto) {
    try {
      const results =
        await this.referralCenterService.searchForLeads(filtersSearchDataDto);
      return {
        message: 'Searched for leads successfully',
        data: results,
      };
    } catch (err: any) {
      throw new HttpException(
        `Error searching for leads: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
