
import { Request, Response } from "express";
import AgentReviewRepo from "../repository/AgentReviewRepo";
import { AgentToAgentReview } from "../model/AgentToAgentReviewModel";
import { ClientToAgentReview } from "../model/ClientToAgentReviewModel";

export interface AgentReviewData {
    review: string,
    rating: number,
    reviewerId: number,
    subjectId: number,
    clientEmail: string
}


class AgentReviewController {

    async createAgentToAgentReview(req: Request, res: Response): Promise<void> {
        try {
            const reqBody: AgentReviewData = req.body;
            await AgentReviewRepo.createAgentToAgentReview(reqBody);
            res.status(200).json({
                message: 'Review created successfully'
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Review cannot be created',
                error: err.toString()
            })
        }
    }
    async createClientToAgentReview(req: Request, res: Response): Promise<void> {
        try {
            const reqBody: AgentReviewData = req.body;
            await AgentReviewRepo.createClientToAgentReview(reqBody);
            res.status(200).json({
                message: 'Review created successfully'
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Review cannot be created',
                error: err.toString()
            })
        }
    }
    async getAgentToAgentReviews(req: Request, res: Response): Promise<void> {
        try {
            const agentId: number = parseInt(req.params.agentId);
            const agentToAgentReviews: AgentToAgentReview[] = await AgentReviewRepo.getAgentToAgentReviews({ agentId: agentId });
            res.status(200).json({
                message: 'Got reviews successfully',
                data: agentToAgentReviews
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Error getting reviews',
                error: err.toString()
            })
        }
    }
    async getClientToAgentReviews(req: Request, res: Response): Promise<void> {
        try {
            const agentId: number = parseInt(req.params.agentId);
            const clientToAgentReviews: ClientToAgentReview[] = await AgentReviewRepo.getClientToAgentReviews({ agentId: agentId });
            res.status(200).json({
                message: 'Got reviews successfully',
                data: clientToAgentReviews
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Error getting reviews',
                error: err.toString()
            })
        }
    }
    async deleteAgentToAgentReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId: number = parseInt(req.params.reviewId);
            await AgentReviewRepo.deleteAgentToAgentReview({ reviewId: reviewId });
            res.status(200).json({
                message: 'Deleted review successfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Error deleting review',
                error: err.toString()
            })
        }
    }
    async deleteClientToAgentReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId: number = parseInt(req.params.reviewId);
            await AgentReviewRepo.deleteClientToAgentReview({ reviewId: reviewId });
            res.status(200).json({
                message: 'Deleted review successfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Error deleting review',
                error: err.toString()
            })
        }
    }

}

export default new AgentReviewController