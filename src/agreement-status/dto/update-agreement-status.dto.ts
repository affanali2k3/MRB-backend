import { PartialType } from '@nestjs/mapped-types';
import { CreateAgreementStatusDto } from './create-agreement-status.dto';

export class UpdateAgreementStatusDto extends PartialType(CreateAgreementStatusDto) {}
