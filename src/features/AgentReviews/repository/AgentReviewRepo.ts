import { Op } from "sequelize";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { Agreement } from "../../Agreement/model/AgreementModel";
import { AgentReviewData } from "../controller/AgentReviewController";
import { AgentToAgentReview } from "../model/AgentToAgentReviewModel";

interface IAgentReviewRepo {
  createAgentToAgentReview(data: AgentReviewData): Promise<void>;
  getAgentToAgentReviews({ agentId }: { agentId: number }): Promise<AgentToAgentReview[]>;
}

class AgentReviewRepo implements IAgentReviewRepo {
  async createAgentToAgentReview(data: AgentReviewData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { referralSenderId: data.reviewerId, referralReceiverId: data.subjectId },
                { referralSenderId: data.subjectId, referralReceiverId: data.reviewerId },
              ],
            },
            { id: data.agreementId },
            { status: "started" },
          ],
        },
      });

      if (!agreement) throw new Error("Agreement does not exist");

      const agentToAgentReview: AgentToAgentReview = new AgentToAgentReview();

      agentToAgentReview.review = data.review;
      agentToAgentReview.rating = data.rating;
      agentToAgentReview.reviewerId = data.reviewerId;
      agentToAgentReview.subjectId = data.subjectId;
      agentToAgentReview.agreementId = agreement.id;

      await agentToAgentReview.save();

      const agentAnalytic: AgentAnalytic | null = await AgentAnalytic.findOne({
        where: { userId: data.subjectId },
      });

      if (!agentAnalytic) throw new Error("Agent analytics does not exist");

      agentAnalytic.agentToAgentRatingNumber = agentAnalytic.agentToAgentRatingNumber + 1;
      agentAnalytic.agentToAgentRatingScore = agentAnalytic.agentToAgentRatingScore + data.rating;
      agentAnalytic.agentToAgentRating = agentAnalytic.agentToAgentRatingScore / agentAnalytic.agentToAgentRatingNumber;

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
}

export default new AgentReviewRepo();
