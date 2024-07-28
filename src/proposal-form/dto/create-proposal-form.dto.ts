import { ProposalFormType } from './proposal-form-types.enum';

export class CreateProposalFormDto {
  receiverAgent: number;
  referralFormId: number;
  formType: ProposalFormType;
  proposal: string;
}
