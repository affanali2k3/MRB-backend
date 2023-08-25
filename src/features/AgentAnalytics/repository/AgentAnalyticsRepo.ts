import { AgentAnalytic } from "../model/AgentAnalyticsModel"


interface IAgentAnalyticsRepo {
    createAnalytic({ userId }: { userId: number }): Promise<void>
    deleteAnalytic({ analyticsId }: { analyticsId: number }): Promise<void>
    getAgentAnalytic({ userId }: { userId: number }): Promise<AgentAnalytic>
    updateAgentToAgentRating({ userId, ratingScore }: { userId: number, ratingScore: number }): Promise<void>
    updateAgentToAgentRating({ userId, ratingScore }: { userId: number, ratingScore: number }): Promise<void>
    updateReferralsSent({ analyticsId }: { analyticsId: number }): Promise<void>
    updateReferralsReceived({ analyticsId }: { analyticsId: number }): Promise<void>
}

class AgentAnalyticsRepo implements IAgentAnalyticsRepo {
    async createAnalytic({ userId }: { userId: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic = new AgentAnalytic();

            agentAnalytic.userId = userId;
            agentAnalytic.referralsReceived = 0;
            agentAnalytic.referralsSent = 0;
            agentAnalytic.agentToAgentRatingNumber = 0;
            agentAnalytic.clientToAgentRatingNumber = 0;
            agentAnalytic.agentToAgentRatingScore = 0;
            agentAnalytic.clientToAgentRatingScore = 0;
            agentAnalytic.agentToAgentRating = 0;
            agentAnalytic.clientToAgentRating = 0;

            await agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async updateReferralsSent({ analyticsId }: { analyticsId: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { id: analyticsId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            agentAnalytic.referralsSent = agentAnalytic.referralsSent + 1;

            await agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async updateAgentToAgentRating({ userId, ratingScore }: { userId: number, ratingScore: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { id: userId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            agentAnalytic.agentToAgentRatingScore = agentAnalytic.agentToAgentRatingScore + ratingScore;
            agentAnalytic.agentToAgentRatingNumber = agentAnalytic.agentToAgentRatingNumber + 1;

            await agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async updateClientToAgentRating({ userId, ratingScore }: { userId: number, ratingScore: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { id: userId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            agentAnalytic.clientToAgentRatingScore = agentAnalytic.clientToAgentRatingScore + ratingScore;
            agentAnalytic.clientToAgentRatingNumber = agentAnalytic.clientToAgentRatingNumber + 1;

            await agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async deleteAnalytic({ analyticsId }: { analyticsId: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { id: analyticsId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            await agentAnalytic.destroy();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async getAgentAnalytic({ userId }: { userId: number }): Promise<AgentAnalytic> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { userId: userId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            return agentAnalytic;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async updateReferralsReceived({ analyticsId }: { analyticsId: number }): Promise<void> {
        try {
            const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({ where: { id: analyticsId } });

            if (!agentAnalytic) throw new Error('Analytics not found');

            agentAnalytic.referralsReceived = agentAnalytic.referralsReceived + 1;

            await agentAnalytic.save();
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

}

export default new AgentAnalyticsRepo