import { User } from "../../UserProfile/model/User";
import { AgentAnalytic } from "../model/AgentAnalyticsModel";

interface IAgentAnalyticsRepo {
  createAnalytic({ userId }: { userId: number }): Promise<void>;
  deleteAnalytic({ analyticsId }: { analyticsId: number }): Promise<void>;
  getAgentAnalytic({ userId }: { userId: number }): Promise<AgentAnalytic>;
  updateAgentToAgentRating({ userId, ratingScore }: { userId: number; ratingScore: number }): Promise<void>;
  updateAgentToAgentRating({ userId, ratingScore }: { userId: number; ratingScore: number }): Promise<void>;
  updateReferralsSent({ analyticsId }: { analyticsId: number }): Promise<void>;
  updateReferralsReceived({ userId }: { userId: number }): Promise<void>;

  getAgentsByStateAndClientType(state: string, clientType: string): Promise<AgentAnalytic[]>;

  // Add new method to fetch all agents
  getAllAgents(): Promise<AgentAnalytic[]>;
}

class AgentAnalyticsRepo implements IAgentAnalyticsRepo {
  async createAnalytic({ userId }: { userId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic = new AgentAnalytic();

      agentAnalytic.userId = userId;
      agentAnalytic.referralsReceived = 0;
      agentAnalytic.referralsSent = 0;
      agentAnalytic.agentToAgentRatingNumber = 0;
      agentAnalytic.agentToAgentRatingScore = 0;
      agentAnalytic.agentToAgentRating = 0;
      agentAnalytic.yearsOfExperience = 0;
      agentAnalytic.housesSold = 0;
      agentAnalytic.housesBought = 0;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateReferralsSent({ analyticsId }: { analyticsId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.referralsSent = agentAnalytic.referralsSent + 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateAgentToAgentRating({ userId, ratingScore }: { userId: number; ratingScore: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { id: userId },
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.agentToAgentRatingScore = agentAnalytic.agentToAgentRatingScore + ratingScore;
      agentAnalytic.agentToAgentRatingNumber = agentAnalytic.agentToAgentRatingNumber + 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async deleteAnalytic({ analyticsId }: { analyticsId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      await agentAnalytic.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAgentAnalytic({ userId }: { userId: number }): Promise<AgentAnalytic> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { userId: userId },
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      return agentAnalytic;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getAllAgentAnalytics(): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics: AgentAnalytic[] = await AgentAnalytic.findAll();

      return agentAnalytics;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async updateReferralsReceived({ userId }: { userId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        include: [
          {
            model: User,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.referralsReceived = agentAnalytic.referralsReceived + 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateYearsOfExperience({ analyticsId, yearsOfExperience }: { analyticsId: number; yearsOfExperience: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { id: analyticsId },
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.yearsOfExperience = yearsOfExperience;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async incrementHousesBought({ userId }: { userId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        include: [
          {
            model: User,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.housesBought = agentAnalytic.housesBought + 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async incrementHousesSold({ userId }: { userId: number }): Promise<void> {
    try {
      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        include: [
          {
            model: User,
            where: { id: userId },
          },
        ],
      });

      if (!agentAnalytic) throw new Error("Analytics not found");

      agentAnalytic.housesSold = agentAnalytic.housesSold + 1;

      await agentAnalytic.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getAgentsByStateAndClientType(state: string, clientType: string): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics: AgentAnalytic[] = await AgentAnalytic.findAll({
        include: [
          {
            model: User,
            where: { licenceState: state },
          },
        ],
      });

      return agentAnalytics;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getAllAgents(): Promise<AgentAnalytic[]> {
    try {
      const agentAnalytics: AgentAnalytic[] = await AgentAnalytic.findAll({
        include: [
          {
            attributes: [User.USER_NAME],
            model: User,
          },
        ],
      });

      return agentAnalytics;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new AgentAnalyticsRepo();
