import { PartialType } from '@nestjs/mapped-types';
import { CreateReferralFormDto } from './create-referral-form.dto';

export class UpdateReferralFormDto extends PartialType(CreateReferralFormDto) {}
