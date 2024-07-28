import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentToAgentReviewDto } from './create-agent-to-agent-review.dto';

export class UpdateAgentToAgentReviewDto extends PartialType(CreateAgentToAgentReviewDto) {}
