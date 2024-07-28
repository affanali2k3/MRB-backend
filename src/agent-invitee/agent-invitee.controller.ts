import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AgentInviteeService } from './agent-invitee.service';

@Controller('agent-invitee')
export class AgentInviteeController {
  constructor(private readonly agentInviteeService: AgentInviteeService) {}

  @Post('create')
  async saveInvitee(
    @Body() body: { inviterEmail: string; inviteeEmail: string },
  ) {
    try {
      await this.agentInviteeService.saveInvitee(
        body.inviterEmail,
        body.inviteeEmail,
      );
      return { message: 'Agent invitee created successfully' };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to create agent invitee',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:inviteeId')
  async deleteInvitee(@Param('inviteeId') inviteeId: number) {
    try {
      await this.agentInviteeService.deleteInvitee(inviteeId);
      return { message: 'Agent invitee deleted successfully' };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to delete agent invitee',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all/:userEmail')
  async getAllInviteesForUser(@Param('userEmail') userEmail: string) {
    try {
      const invitees =
        await this.agentInviteeService.getAllInviteesForUser(userEmail);
      return {
        message: 'Got agent invitees successfully',
        data: invitees,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to get agent invitees',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
