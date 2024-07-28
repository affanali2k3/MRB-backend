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
import { AgentToAgentReviewService } from './agent-to-agent-review.service';
import { CreateAgentToAgentReviewDto } from './dto/create-agent-to-agent-review.dto';

@Controller('agent-review')
export class AgentToAgentReviewController {
  constructor(private readonly agentReviewService: AgentToAgentReviewService) {}

  @Post('create/agent-to-agent-review')
  async createAgentToAgentReview(@Body() body: CreateAgentToAgentReviewDto) {
    try {
      await this.agentReviewService.createAgentToAgentReview(body);
      return { message: 'Review created successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('get/agent-to-agent-review')
  async getAgentToAgentReviews(@Query('userId') userId: string) {
    try {
      const id: number = parseInt(userId);
      const reviews = await this.agentReviewService.getAgentToAgentReviews(id);
      return {
        message: 'Got reviews successfully',
        data: reviews,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
