import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProposalFormService } from './proposal-form.service';
import { UpdateProposalFormDto } from './dto/update-proposal-form.dto';
import { CreateProposalFormDto } from './dto/create-proposal-form.dto';

@Controller('proposals')
export class ProposalFormController {
  constructor(private readonly proposalService: ProposalFormService) {}

  @Post('create')
  async createForm(@Body() createProposalDto: CreateProposalFormDto) {
    try {
      await this.proposalService.createProposal(createProposalDto);
      return { message: 'Form created successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to create form: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('open-forms-proposal-received')
  async getOpenFormsProposalsReceivedByUser(@Query('userId') userId: string) {
    try {
      const openProposals =
        await this.proposalService.getOpenFormsProposalsReceivedByUser(+userId);

      return {
        message: 'Got proposals successfully',
        openProposals: openProposals,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get proposals: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('direct-forms-proposal-received')
  async getDirectFormsProposalsReceivedByUser(@Query('userId') userId: string) {
    try {
      const directProposals =
        await this.proposalService.getDirectFormsProposalsReceivedByUser(
          +userId,
        );
      return {
        message: 'Got proposals successfully',
        data: directProposals,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get proposals: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('open-forms-sent')
  async getOpenFormsSentByUser(@Query('userId') userId: string) {
    try {
      const openFormsSent =
        await this.proposalService.getOpenFormsSent(+userId);
      return {
        message: 'Got open forms sent successfully',
        data: openFormsSent,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get open forms sent: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('reject-received-proposal')
  async rejectReceivedProposal(
    @Body() updateProposalStatusDto: UpdateProposalFormDto,
  ) {
    try {
      await this.proposalService.rejectReceivedProposal(
        updateProposalStatusDto,
      );
      return { message: 'Rejected proposal successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to reject proposal: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('accept-received-proposal')
  async acceptReceivedProposal(
    @Body() updateProposalStatusDto: UpdateProposalFormDto,
  ) {
    try {
      await this.proposalService.acceptReceivedProposal(
        updateProposalStatusDto,
      );
      return { message: 'Accepted proposal successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to accept proposal: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
