import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProposalOpenForm } from './proposal-open-form.model';
import { ProposalDirectForm } from './proposal-close-form.model';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { ReferralDirectForm } from 'src/referral-form/referral-direct-form';
import { User } from 'src/user/user.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { UpdateProposalFormDto } from './dto/update-proposal-form.dto';
import { ReferralFormType } from 'src/referral-form/dto/referral-form-types.enum';
import { ProposalFormType } from './dto/proposal-form-types.enum';
import { AgreementService } from 'src/agreement/agreement.service';
import { CreateProposalFormDto } from './dto/create-proposal-form.dto';
import { ProposalStatus } from './dto/proposal-status.enum';
@Injectable()
export class ProposalFormService {
  constructor(
    @InjectModel(ProposalOpenForm)
    private proposalOpenFormModel: typeof ProposalOpenForm,
    @InjectModel(ProposalDirectForm)
    private proposalDirectFormModel: typeof ProposalDirectForm,
    @InjectModel(ReferralOpenForm)
    private referralOpenFormModel: typeof ReferralOpenForm,
    @InjectModel(ReferralDirectForm)
    private referralDirectFormModel: typeof ReferralDirectForm,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
    private readonly agreementService: AgreementService,
  ) {}

  async createProposal(dto: CreateProposalFormDto): Promise<void> {
    try {
      if (dto.formType === ProposalFormType.Direct) {
        const senderAgentForm = await this.referralDirectFormModel.findOne({
          where: { id: dto.referralFormId },
        });

        if (!senderAgentForm)
          throw new NotFoundException('Form to apply for does not exist');

        if (dto.receiverAgent === senderAgentForm.senderAgentId)
          throw new BadRequestException('Cannot apply to your own referral');

        const receiverAgentDirectForm = this.proposalDirectFormModel.build({
          receiverAgentId: dto.receiverAgent,
          senderAgentFormId: dto.referralFormId,
          proposal: dto.proposal,
          status: ProposalStatus.Awaiting,
        });

        await receiverAgentDirectForm.save();
      } else if (dto.formType === ProposalFormType.Open) {
        const senderAgentForm = await this.referralOpenFormModel.findOne({
          where: { id: dto.referralFormId },
        });

        if (!senderAgentForm)
          throw new NotFoundException('Form to apply for does not exist');

        if (dto.receiverAgent === senderAgentForm.senderAgentId)
          throw new BadRequestException('Cannot apply to your own referral');

        const receiverAgentOpenForm = this.proposalOpenFormModel.build({
          receiverAgentId: dto.receiverAgent,
          senderAgentFormId: dto.referralFormId,
          proposal: dto.proposal,
          status: ProposalStatus.Awaiting,
        });

        await receiverAgentOpenForm.save();
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getOpenFormsProposalsReceivedByUser(
    userId: number,
  ): Promise<ProposalOpenForm[]> {
    try {
      const openFormsProposalsReceived =
        await this.proposalOpenFormModel.findAll({
          include: [
            {
              model: this.referralOpenFormModel,
              where: { senderAgentId: userId },
              include: [
                {
                  model: this.userModel,
                  include: [
                    {
                      model: this.agentAnalyticModel,
                    },
                  ],
                },
              ],
            },
          ],
        });

      return openFormsProposalsReceived;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getDirectFormsProposalsReceivedByUser(
    userId: number,
  ): Promise<ProposalDirectForm[]> {
    try {
      const directFormsProposalsReceived =
        await this.proposalDirectFormModel.findAll({
          include: [
            {
              model: this.referralDirectFormModel,
              where: { senderAgentId: userId },
              include: [
                {
                  model: this.userModel,
                  as: ReferralDirectForm.SENDER_AGENT,
                  include: [
                    {
                      model: this.agentAnalyticModel,
                    },
                  ],
                },
              ],
            },
          ],
        });

      return directFormsProposalsReceived;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async rejectReceivedProposal(dto: UpdateProposalFormDto): Promise<void> {
    try {
      if (dto.formType == ReferralFormType.Direct) {
        const form = await this.proposalDirectFormModel.findOne({
          where: { id: dto.proposalFormId },
        });

        if (!form)
          throw new NotFoundException(
            'Cannot reject form because it does not exist',
          );

        form.status = ProposalStatus.Rejected;

        await form.save();
      } else {
        const form = await this.proposalOpenFormModel.findOne({
          where: { id: dto.proposalFormId },
        });

        if (!form)
          throw new NotFoundException(
            'Cannot reject form because it does not exist',
          );

        form.status = ProposalStatus.Rejected;

        await form.save();
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async acceptReceivedProposal(dto: UpdateProposalFormDto): Promise<void> {
    try {
      if (dto.formType == ReferralFormType.Direct) {
        const form = await this.proposalDirectFormModel.findOne({
          where: { id: dto.proposalFormId },
        });

        if (!form)
          throw new NotFoundException(
            'Cannot accept form because it does not exist',
          );

        if (form.status === ProposalStatus.Accepted)
          throw new BadRequestException('Proposal already accepted');

        form.status = ProposalStatus.Accepted;

        await form.save();

        await this.agreementService.createAgreement({
          referralReceiverId: form.receiverAgentId,
          referralSenderId: form.senderAgentFormId,
        });
      } else {
        const form = await this.proposalOpenFormModel.findOne({
          where: { id: dto.proposalFormId },
        });

        if (!form)
          throw new NotFoundException(
            'Cannot accept form because it does not exist',
          );

        if (form.status === ProposalStatus.Accepted)
          throw new BadRequestException('Proposal already accepted');

        const openReferralForm = await this.referralOpenFormModel.findOne({
          where: { id: form.senderAgentFormId },
        });

        if (!openReferralForm)
          throw new NotFoundException(
            'Open referral form does not exist for this proposal',
          );

        await this.agreementService.createAgreement({
          referralReceiverId: form.receiverAgentId,
          referralSenderId: openReferralForm.senderAgentId,
        });

        form.status = ProposalStatus.Accepted;

        await form.save();
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getOpenFormsSent(userId: number): Promise<ProposalOpenForm[]> {
    try {
      const formsSent = await this.proposalOpenFormModel.findAll({
        where: { receiverAgentId: userId },
        include: [
          {
            model: this.referralOpenFormModel,
            include: [
              {
                model: this.userModel,
              },
            ],
          },
        ],
      });

      return formsSent;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
