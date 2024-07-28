import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AgentAnalyticService } from './agent-analytic.service';
import { CreateAgentAnalyticDto } from './dto/create-agent-analytic.dto';
import { UpdateAgentAnalyticDto } from './dto/update-agent-analytic.dto';

@Controller('agent-analytic')
export class AgentAnalyticController {
  constructor(private readonly agentAnalyticService: AgentAnalyticService) {}

  @Patch('referrals-sent')
  async updateReferralsSent(@Body() body: { analyticId: number }) {
    try {
      await this.agentAnalyticService.updateReferralsSent(body.analyticId);
      return { message: 'Analytic referrals sent updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('agent-to-agent-rating')
  async updateAgentToAgentRating(
    @Body() body: { userId: number; ratingScore: number },
  ) {
    try {
      await this.agentAnalyticService.updateAgentToAgentRating(
        body.userId,
        body.ratingScore,
      );
      return { message: 'Agent to agent review updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('get-agent-analytic')
  async getAgentAnalytic(@Query('userId') userId: string) {
    try {
      const agentAnalytic = await this.agentAnalyticService.getAgentAnalytic(
        parseInt(userId),
      );
      return {
        message: 'Analytic received successfully',
        data: agentAnalytic,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('update/referrals-received')
  async updateReferralsReceived(@Body() body: { userId: number }) {
    try {
      await this.agentAnalyticService.updateReferralsReceived(body.userId);
      return { message: 'Analytic referrals received updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('update/years-of-experience')
  async updateYearsOfExperience(
    @Body() body: { analyticId: number; yearsOfExperience: number },
  ) {
    try {
      await this.agentAnalyticService.updateYearsOfExperience(
        body.analyticId,
        body.yearsOfExperience,
      );
      return { message: 'Analytic years of experience updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('update/houses-bought')
  async incrementHousesBought(@Body() body: { userId: number }) {
    try {
      await this.agentAnalyticService.incrementHousesBought(body.userId);
      return { message: 'Analytic houses bought updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('update/houses-sold')
  async incrementHousesSold(@Body() body: { userId: number }) {
    try {
      await this.agentAnalyticService.incrementHousesSold(body.userId);
      return { message: 'Analytic houses sold updated successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
