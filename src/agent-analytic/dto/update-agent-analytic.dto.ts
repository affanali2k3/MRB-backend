import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentAnalyticDto } from './create-agent-analytic.dto';

export class UpdateAgentAnalyticDto extends PartialType(CreateAgentAnalyticDto) {}
