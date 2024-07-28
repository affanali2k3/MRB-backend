import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AgentAnalytic } from './agent-analytic.model';
import { User } from 'src/user/user.model';

@Injectable()
export class AgentAnalyticService {
  constructor(
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,

    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createAnalytic(userId: number): Promise<void> {
    try {
      const agentAnalytic = this.agentAnalyticModel.build({
        userId,
        referralsReceived: 0,
        referralsSent: 0,
        agentToAgentRatingNumber: 0,
        agentToAgentRatingScore: 0,
        agentToAgentRating: 0,
        yearsOfExperience: 0,
        housesSold: 0,
        housesBought: 0,
      });

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteAnalytic(analyticsId: number): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      await agentAnalytic.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAgentAnalytic(userId: number): Promise<AgentAnalytic> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { userId },
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      return agentAnalytic;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateAgentToAgentRating(
    userId: number,
    ratingScore: number,
  ): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { userId },
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.agentToAgentRatingScore += ratingScore;
      agentAnalytic.agentToAgentRatingNumber += 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateReferralsSent(analyticsId: number): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.referralsSent += 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateReferralsReceived(userId: number): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        include: [
          {
            model: this.userModel,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.referralsReceived += 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateYearsOfExperience(
    analyticsId: number,
    yearsOfExperience: number,
  ): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.yearsOfExperience = yearsOfExperience;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async incrementHousesBought(userId: number): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        include: [
          {
            model: this.userModel,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.housesBought += 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async incrementHousesSold(userId: number): Promise<void> {
    try {
      const agentAnalytic = await this.agentAnalyticModel.findOne({
        include: [
          {
            model: this.userModel,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new NotFoundException('Analytics not found');

      agentAnalytic.housesSold += 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAgentsByStateAndClientType(
    state: string,
    clientType: string,
  ): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics = await this.agentAnalyticModel.findAll({
        include: [
          {
            model: this.userModel,
            where: { licenseState: state },
          },
        ],
      });

      return agentAnalytics;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllAgents(): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics = await this.agentAnalyticModel.findAll({
        include: [
          {
            attributes: ['name'],
            model: this.userModel,
          },
        ],
      });

      return agentAnalytics;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllAgentAnalytics(): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics = await this.agentAnalyticModel.findAll();
      return agentAnalytics;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
