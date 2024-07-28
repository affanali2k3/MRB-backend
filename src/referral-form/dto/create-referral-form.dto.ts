import { ReferralFormType } from './referral-form-types.enum';

export class CreateReferralFormDto {
  senderAgent: number;
  receiverAgent: number;
  formType: ReferralFormType;
  isBuyer: boolean;
  city: string;
  state: string;
  providence: string;
  timeAmount: number;
  timeUnit: string;
  details: string;
  typeOfHouse: string;
  price: number;
}
