import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AgreementStatus } from './agreement-status.model';
import { Agreement } from 'src/agreement/agreement.model';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationTypes } from 'src/notification/dto/notification-types.enum';

interface CreateAgreementStatusDto {
  agreementId: number;
  status: string;
}

interface GetAgreementStatusDto {
  id: number;
}

@Injectable()
export class AgreementStatusService {
  constructor(
    @InjectModel(AgreementStatus)
    private agreementStatusModel: typeof AgreementStatus,
    @InjectModel(Agreement) private agreementModel: typeof Agreement,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: CreateAgreementStatusDto): Promise<void> {
    try {
      const agreementStatus = this.agreementStatusModel.build({
        ...dto,
      });

      await agreementStatus.save();

      const agreement = await this.agreementModel.findOne({
        where: { id: agreementStatus.agreementId },
      });

      if (agreement) {
        await this.notificationService.createNotification({
          userId: agreement.referralSenderId,
          type: NotificationTypes.AGREEMENT_UPDATED,
          referenceId: agreementStatus.agreementId,
        });
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllStatus(data: GetAgreementStatusDto): Promise<AgreementStatus[]> {
    try {
      const agreementStatus = await this.agreementStatusModel.findAll({
        where: { agreementId: data.id },
      });

      return agreementStatus;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
