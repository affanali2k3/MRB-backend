import { Request, Response } from "express";
import AgentAnalyticsRepo from "../../AgentAnalytics/repository/AgentAnalyticsRepo";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";

class RecommendationController {
  async getBestAgents(req: Request, res: Response) {
    try {
      // Get the state from req.query
      const state = req.query.state as string;

      // Get the client type from req.query
      const clientType = req.query.clientType as string;

      // Fetch all agent analytics for the specified state and client type
      const agentAnalytics: AgentAnalytic[] = await AgentAnalyticsRepo.getAgentsByStateAndClientType(state, clientType);

      // Sort agents based on your criteria (referralsSent, listingsSold, housesSold, yearsOfExperience, agentToAgentRatingScore, etc.)
      agentAnalytics.sort((a, b) => {
        // Customize this comparison based on your criteria
        if (a.referralsSent !== b.referralsSent) {
          return b.referralsSent - a.referralsSent;
        }
        // Add more comparisons for other criteria here
        return 0;
      });

      res.status(200).json({ message: 'Best agents found', data: agentAnalytics });
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to find best agents', error: err.toString() });
    }
  }

  async getAllAgents(req: Request, res: Response) {
    try {
      // Get the state from req.query
      const state = req.query.state as string;

      // Fetch agents based on the specified state
      const agents: AgentAnalytic[] = await AgentAnalyticsRepo.getAllAgents();

      res.status(200).json({ message: 'Agents found', data: agents });
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to find agents', error: err.toString() });
    }
  }

  async getAgentsFiltered(req: Request, res: Response) {
    try {
      // Get the state from req.query
      const state = req.query.state as string;
  
      // Get the client type from req.query
      const clientType = req.query.clientType as string;
  
      // Get the minimum number of referrals sent from req.query
      const minReferralsSent = parseInt(req.query.minReferralsSent as string);

      // Get the minimum number of houses sold from req.query
      const minHousesSold = parseInt(req.query.minHousesSold as string);

      const minYearsOfExperience = parseInt(req.query.minYearsOfExperience as string);
  
  
      // Fetch all agent analytics for the specified state and client type
      const agentAnalytics: AgentAnalytic[] = await AgentAnalyticsRepo.getAgentsByStateAndClientType(state, clientType);
  
      // Filter agents based on the specified criteria
      const filteredAgents = agentAnalytics.filter(agent => {

        return agent.referralsSent >= minReferralsSent && agent.housesSold >= minHousesSold && agent.yearsOfExperience >= minYearsOfExperience
      });
  
      res.status(200).json({ message: 'Filtered agents found', data: filteredAgents });
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to find filtered agents', error: err.toString() });
    }
  }
}

export default new RecommendationController();
