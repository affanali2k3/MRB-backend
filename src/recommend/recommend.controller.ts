import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  // @Get('get-agents')
  // async getAgentsFiltered(@Query() query: any) {
  //   try {
  //     const agents = await this.recommendService.getAgentsFiltered(query);
  //     return {
  //       message: 'Filtered agents found',
  //       data: agents,
  //     };
  //   } catch (err: any) {
  //     throw new HttpException(
  //       `Failed to find filtered agents: ${err.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
