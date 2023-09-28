import { Request, Response } from "express";
import AgentAnalyticsRepo from "../repository/AgentAnalyticsRepo";
import { AgentAnalytic } from "../model/AgentAnalyticsModel";

class AgentAnalyticController {

    async createAnalytic(req: Request, res: Response) {
        try {
            const userId: number = req.body.userId;

            await AgentAnalyticsRepo.createAnalytic({ userId: userId });

            res.status(200).json({
                message: 'Analytic created succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to create analytic ',
                error: err.toString()
            })
        }
    }

    async updateReferralsSent(req: Request, res: Response) {
        try {
            const analyticId: number = req.body.analyticId;

            await AgentAnalyticsRepo.updateReferralsSent({ analyticsId: analyticId });

            res.status(200).json({
                message: 'Analytic referrals sent updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update analytic referrals sent',
                error: err.toString()
            })
        }
    }
    async updateAgentToAgentRating(req: Request, res: Response) {
        try {
            const userId: number = req.body.userId;
            const ratingScore: number = req.body.ratingScore;

            await AgentAnalyticsRepo.updateAgentToAgentRating({ userId: userId, ratingScore: ratingScore });

            res.status(200).json({
                message: 'Agent to agent review updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update agent to agent review',
                error: err.toString()
            })
        }
    }
    async updateClientToAgentRating(req: Request, res: Response) {
        try {
            const userId: number = req.body.userId;
            const ratingScore: number = req.body.ratingScore;

            await AgentAnalyticsRepo.updateClientToAgentRating({ userId: userId, ratingScore: ratingScore });

            res.status(200).json({
                message: 'Client to agent review updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update client to agent review',
                error: err.toString()
            })
        }
    }
    async deleteAnalytic(req: Request, res: Response) {
        try {
            const analyticId: number = parseInt(req.params.analyticId);

            await AgentAnalyticsRepo.deleteAnalytic({ analyticsId: analyticId });

            res.status(200).json({
                message: 'Analytic deleted succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to delete analytic',
                error: err.toString()
            })
        }
    }
    async getAgentAnalytic(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.params.userId);

            const agentAnalytic: AgentAnalytic = await AgentAnalyticsRepo.getAgentAnalytic({ userId: userId });

            res.status(200).json({
                message: 'Analytic deleted succesfully',
                data: agentAnalytic
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to delete analytic',
                error: err.toString()
            })
        }
    }

    async updateReferralsReceived(req: Request, res: Response) {
        try {
            const analyticId: number = req.body.analyticId;

            await AgentAnalyticsRepo.updateReferralsReceived({ analyticsId: analyticId });

            res.status(200).json({
                message: 'Analytic referrals received updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update analytic referrals received',
                error: err.toString()
            })
        }
    }

    async updateYearsOfExperience(req: Request, res: Response) {
        try {
            const analyticId: number = req.body.analyticId;
            const yearsOfExperience: number = req.body.yearsOfExperience;

            await AgentAnalyticsRepo.updateYearsOfExperience({ analyticsId: analyticId, yearsOfExperience: yearsOfExperience });

            res.status(200).json({
                message: 'Analytic years of experience updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update analytic years of experience',
                error: err.toString()
            })
        }
    }

    async updateListingsSold(req: Request, res: Response) {
        try {
            const analyticId: number = req.body.analyticId;
            const listingsSold: number = req.body.listingsSold;

            await AgentAnalyticsRepo.updateListingsSold({ analyticsId: analyticId, listingsSold: listingsSold });

            res.status(200).json({
                message: 'Analytic listings sold updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update analytic listings sold',
                error: err.toString()
            })
        }
    }

    async updateHousesSold(req: Request, res: Response) {
        try {
            const analyticId: number = req.body.analyticId;
            const housesSold: number = req.body.housesSold;

            await AgentAnalyticsRepo.updateHousesSold({ analyticsId: analyticId, housesSold: housesSold });

            res.status(200).json({
                message: 'Analytic houses sold updated succesfully',
            })
        } catch (err: any) {
            res.status(500).json({
                message: 'Failed to update analytic houses sold ',
                error: err.toString()
            })
        }
    }
}

export default new AgentAnalyticController