import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { AgentToAgentReview } from './agent-to-agent-review.model';
import { Agreement } from 'src/agreement/agreement.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { CreateAgentToAgentReviewDto } from './dto/create-agent-to-agent-review.dto';
import { AgreementStatusType } from 'src/agreement/dto/agreement-status-types.enum';

@Injectable()
export class AgentToAgentReviewService {
  constructor(
    @InjectModel(AgentToAgentReview)
    private agentToAgentReviewModel: typeof AgentToAgentReview,
    @InjectModel(Agreement) private agreementModel: typeof Agreement,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
  ) {}

  async createAgentToAgentReview(
    dto: CreateAgentToAgentReviewDto,
  ): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  referralSenderId: dto.reviewerId,
                  referralReceiverId: dto.subjectId,
                },
                {
                  referralSenderId: dto.subjectId,
                  referralReceiverId: dto.reviewerId,
                },
              ],
            },
            { id: dto.agreementId },
            { status: AgreementStatusType.Closed },
          ],
        },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      const review = await this.agentToAgentReviewModel.findOne({
        where: {
          reviewerId: dto.reviewerId,
          subjectId: dto.subjectId,
          agreementId: dto.agreementId,
        },
      });

      if (review) throw new ConflictException('Review already exist');

      const agentToAgentReview = this.agentToAgentReviewModel.build({
        review: dto.review,
        rating: dto.rating,
        reviewerId: dto.reviewerId,
        subjectId: dto.subjectId,
        agreementId: agreement.id,
      });

      await agentToAgentReview.save();

      const agentAnalytic = await this.agentAnalyticModel.findOne({
        where: { userId: dto.subjectId },
      });

      if (!agentAnalytic)
        throw new NotFoundException('Agent analytics does not exist');

      agentAnalytic.agentToAgentRatingNumber += 1;
      agentAnalytic.agentToAgentRatingScore += dto.rating;
      agentAnalytic.agentToAgentRating =
        agentAnalytic.agentToAgentRatingScore /
        agentAnalytic.agentToAgentRatingNumber;

      await agentAnalytic.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getAgentToAgentReviews(agentId: number): Promise<AgentToAgentReview[]> {
    try {
      const agentToAgentReviews = await this.agentToAgentReviewModel.findAll({
        where: { subjectId: agentId },
      });

      return agentToAgentReviews;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
