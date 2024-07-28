import { ReferralFormType } from 'src/referral-form/dto/referral-form-types.enum';

export class UpdateProposalFormDto {
  proposalFormId: number;
  formType: ReferralFormType;
}
