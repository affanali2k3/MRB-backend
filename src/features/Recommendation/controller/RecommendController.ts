import { Request, Response } from "express";
import AgentAnalyticsRepo from "../../AgentAnalytics/repository/AgentAnalyticsRepo";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";

class RecommendationController {
  async getBestAgent(req: Request, res: Response) {
    try {
      const agentAnalytics: AgentAnalytic[] = await AgentAnalyticsRepo.getAllAgentAnalytics();
      let bestAgent: AgentAnalytic = agentAnalytics[0];
      for (let i = 1; i < agentAnalytics.length; i++) {
        const currentAgent = agentAnalytics[i];

        // only making comparisions based on referrals sent Ill add different ways to getBest agent if that is required
        if (currentAgent.referralsSent > bestAgent.referralsSent) {
          bestAgent = currentAgent;
        }
      }
      res.status(200).json({ message: 'Best agent found', data: bestAgent });
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to find best agent', error: err.toString() });
    }
  }
}

export default new RecommendationController();