import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentInviteeDto } from './create-agent-invitee.dto';

export class UpdateAgentInviteeDto extends PartialType(CreateAgentInviteeDto) {}
