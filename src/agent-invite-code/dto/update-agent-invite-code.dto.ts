import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentInviteCodeDto } from './create-agent-invite-code.dto';

export class UpdateAgentInviteCodeDto extends PartialType(CreateAgentInviteCodeDto) {}
