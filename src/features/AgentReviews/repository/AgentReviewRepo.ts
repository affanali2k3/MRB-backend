import { Op } from "sequelize";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { Agreement } from "../../Agreement/model/AgreementModel";
import { AgentReviewData } from "../controller/AgentReviewController";
import { AgentToAgentReview } from "../model/AgentToAgentReviewModel";
import { AgreementStatus } from "../../AgreementStatus/model/AgreementStatusModel";
import { AgreementStatusType } from "../../Agreement/controller/AgreementController";

interface IAgentReviewRepo {
  createAgentToAgentReview(data: AgentReviewData): Promise<void>;
  getAgentToAgentReviews({ agentId }: { agentId: number }): Promise<AgentToAgentReview[]>;
}

class AgentReviewRepo implements IAgentReviewRepo {
  async createAgentToAgentReview(data: AgentReviewData): Promise<void> {
    try {
      /*
        An agent can only give review to another agent if:
        1. The agreement exists between those two agents
        2. Agreement status is closed
        3. Sender has not uploaded proof of payment received
        4. Receiver has not uploaded proof of property closed
      */
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
            { status: AgreementStatusType.Started },
            { senderCheckReceivedProof: { [Op.not]: null } },
            { receiverPropertyClosedProof: { [Op.not]: null } },
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
