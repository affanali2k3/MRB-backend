import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel"
import { AgentReviewData } from "../controller/AgentReviewController"
import { AgentToAgentReview } from "../model/AgentToAgentReviewModel"
import { ClientToAgentReview } from "../model/ClientToAgentReviewModel"


interface IAgentReviewRepo {
    createAgentToAgentReview(data: AgentReviewData): Promise<void>
    createClientToAgentReview(data: AgentReviewData): Promise<void>
    getAgentToAgentReviews({ agentId }: { agentId: number }): Promise<AgentToAgentReview[]>
    getClientToAgentReviews({ agentId }: { agentId: number }): Promise<ClientToAgentReview[]>
    deleteAgentToAgentReview({ reviewId }: { reviewId: number }): Promise<void>
    deleteClientToAgentReview({ reviewId }: { reviewId: number }): Promise<void>
}


class AgentReviewRepo implements IAgentReviewRepo {
    async createAgentToAgentReview(data: AgentReviewData): Promise<void> {
        try {
            const agentToAgentReview: AgentToAgentReview = new AgentToAgentReview();

            agentToAgentReview.review = data.review;
            agentToAgentReview.rating = data.rating;
            agentToAgentReview.reviewerId = data.reviewerId;
            agentToAgentReview.subjectId = data.subjectId;

            await agentToAgentReview.save();

            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { userId: data.subjectId } })

            if (!agentAnalytic) throw new Error('Agent analytics does not exist');

            agentAnalytic.agentToAgentRatingNumber = agentAnalytic.agentToAgentRatingNumber + 1;
            agentAnalytic.agentToAgentRatingScore = agentAnalytic.agentToAgentRatingScore + data.rating;

            agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async createClientToAgentReview(data: AgentReviewData): Promise<void> {
        try {
            const clientToAgentReview: ClientToAgentReview = new ClientToAgentReview();

            clientToAgentReview.review = data.review;
            clientToAgentReview.rating = data.rating;
            clientToAgentReview.clientEmail = data.clientEmail;
            clientToAgentReview.subjectId = data.subjectId;

            await clientToAgentReview.save();

            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { userId: data.subjectId } })

            if (!agentAnalytic) throw new Error('Agent analytics does not exist');

            agentAnalytic.clientToAgentRatingNumber = agentAnalytic.clientToAgentRatingNumber + 1;
            agentAnalytic.clientToAgentRatingScore = agentAnalytic.clientToAgentRatingScore + data.rating;

            agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getAgentToAgentReviews({ agentId }: { agentId: number }): Promise<AgentToAgentReview[]> {
        try {
            const agentToAgentReviews: AgentToAgentReview[] = await AgentToAgentReview.findAll({ where: { subjectId: agentId } });

            return agentToAgentReviews;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getClientToAgentReviews({ agentId }: { agentId: number }): Promise<ClientToAgentReview[]> {
        try {
            const clientToAgentReviews: ClientToAgentReview[] = await ClientToAgentReview.findAll({ where: { subjectId: agentId } });

            return clientToAgentReviews;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async deleteAgentToAgentReview({ reviewId }: { reviewId: number }): Promise<void> {
        try {
            const agentToAgentReview: AgentToAgentReview | null = await AgentToAgentReview.findOne({ where: { id: reviewId } });

            if (!agentToAgentReview) throw new Error('Review does not exist');

            await agentToAgentReview.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async deleteClientToAgentReview({ reviewId }: { reviewId: number }): Promise<void> {
        try {
            const clientToAgentReview: ClientToAgentReview | null = await ClientToAgentReview.findOne({ where: { id: reviewId } });

            if (!clientToAgentReview) throw new Error('Review does not exist');

            await clientToAgentReview.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new AgentReviewRepo;