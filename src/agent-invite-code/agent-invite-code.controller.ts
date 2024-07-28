import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AgentInviteCodeService } from './agent-invite-code.service';

@Controller('agent-invite-code')
export class AgentInviteCodeController {
  constructor(
    private readonly agentInviteCodeService: AgentInviteCodeService,
  ) {}

  @Post('create')
  async createCode(@Body() body: { userEmail: string }) {
    try {
      await this.agentInviteCodeService.createCode(body.userEmail);
      return { message: 'Agent invite code created successfully' };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to create agent invite code',
          errcor: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('share')
  async shareCode(@Body() body: { sharedEmail: string; codeId: number }) {
    try {
      await this.agentInviteCodeService.shareCode(
        body.codeId,
        body.sharedEmail,
      );
      return { message: 'Agent invite code shared successfully' };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to share agent invite code',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:codeId')
  async deleteCode(@Param('codeId') codeId: number) {
    try {
      await this.agentInviteCodeService.deleteCode(codeId);
      return { message: 'Agent invite code deleted successfully' };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to delete agent invite code',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all/:userEmail')
  async getAllCodesForUser(@Param('userEmail') userEmail: string) {
    try {
      const codes =
        await this.agentInviteCodeService.getAllCodesForUser(userEmail);
      return {
        message: 'Got agent invite codes successfully',
        data: codes,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to get agent invite codes',
          error: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
