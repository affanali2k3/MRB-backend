import { Request, Response } from "express";
import AgentAnalyticsRepo from "../repository/AgentAnalyticsRepo";
import { AgentAnalytic } from "../model/AgentAnalyticsModel";

class AgentAnalyticController {
  async updateReferralsSent(req: Request, res: Response) {
    try {
      const analyticId: number = req.body.analyticId;

      await AgentAnalyticsRepo.updateReferralsSent({ analyticsId: analyticId });

      res.status(200).json({
        message: "Analytic referrals sent updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update analytic referrals sent",
        error: err.toString(),
      });
    }
  }

  async updateAgentToAgentRating(req: Request, res: Response) {
    try {
      const userId: number = req.body.userId;
      const ratingScore: number = req.body.ratingScore;

      await AgentAnalyticsRepo.updateAgentToAgentRating({
        userId: userId,
        ratingScore: ratingScore,
      });

      res.status(200).json({
        message: "Agent to agent review updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update agent to agent review",
        error: err.toString(),
      });
    }
  }

  async getAgentAnalytic(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const agentAnalytic: AgentAnalytic = await AgentAnalyticsRepo.getAgentAnalytic({ userId: userId });

      res.status(200).json({
        message: "Analytic recieved successfully",
        data: agentAnalytic,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to recieve analytics",
        error: err.toString(),
      });
    }
  }

  // async getAllAgentAnalytics(req: Request, res: Response) {
  //   try {
  //     const agentAnalytics: AgentAnalytic[] = await AgentAnalyticsRepo.getAllAgentAnalytics();

  //     res.status(200).json({
  //       message: "Analytics recieved successfully",
  //       data: agentAnalytics,
  //     });
  //   } catch (err: any) {
  //     res.status(500).json({
  //       message: "Failed to recieve analytics",
  //       error: err.toString(),
  //     });
  //   }
  // }

  async updateReferralsReceived(req: Request, res: Response) {
    try {
      const userId: number = req.body.userId;

      await AgentAnalyticsRepo.updateReferralsReceived({
        userId: userId,
      });

      res.status(200).json({
        message: "Analytic referrals received updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update analytic referrals received",
        error: err.toString(),
      });
    }
  }

  async updateYearsOfExperience(req: Request, res: Response) {
    try {
      const analyticId: number = req.body.analyticId;
      const yearsOfExperience: number = req.body.yearsOfExperience;

      await AgentAnalyticsRepo.updateYearsOfExperience({
        analyticsId: analyticId,
        yearsOfExperience: yearsOfExperience,
      });

      res.status(200).json({
        message: "Analytic years of experience updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update analytic years of experience",
        error: err.toString(),
      });
    }
  }

  async incrementHousesBought(req: Request, res: Response) {
    try {
      const userId: number = req.body.userId;

      await AgentAnalyticsRepo.incrementHousesBought({
        userId: userId,
      });

      res.status(200).json({
        message: "Analytic houses bought updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update analytic houses bought",
        error: err.toString(),
      });
    }
  }

  async incrementHousesSold(req: Request, res: Response) {
    try {
      const userId: number = req.body.userId;

      await AgentAnalyticsRepo.incrementHousesSold({
        userId: userId,
      });

      res.status(200).json({
        message: "Analytic houses sold updated succesfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Failed to update analytic houses sold ",
        error: err.toString(),
      });
    }
  }
}

export default new AgentAnalyticController();
