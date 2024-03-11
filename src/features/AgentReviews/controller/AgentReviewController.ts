import { Request, Response } from "express";
import AgentReviewRepo from "../repository/AgentReviewRepo";
import { AgentToAgentReview } from "../model/AgentToAgentReviewModel";

export interface AgentReviewData {
  review: string;
  rating: number;
  reviewerId: number;
  subjectId: number;
  agreementId: number;
}

class AgentReviewController {
  async createAgentToAgentReview(req: Request, res: Response): Promise<void> {
    try {
      const reqBody: AgentReviewData = req.body;
      await AgentReviewRepo.createAgentToAgentReview(reqBody);
      res.status(200).json({
        message: "Review created successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Review cannot be created",
        error: err.toString(),
      });
    }
  }

  async getAgentToAgentReviews(req: Request, res: Response): Promise<void> {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const agentToAgentReviews: AgentToAgentReview[] = await AgentReviewRepo.getAgentToAgentReviews({ agentId: userId });
      res.status(200).json({
        message: "Got reviews successfully",
        data: agentToAgentReviews,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error getting reviews",
        error: err.toString(),
      });
    }
  }
}

export default new AgentReviewController();
