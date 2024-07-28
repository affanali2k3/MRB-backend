import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  PreconditionFailedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as PDFDocument from 'pdfkit';
import { Agreement } from './agreement.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationTypes } from 'src/notification/dto/notification-types.enum';
import * as fs from 'fs';
import * as path from 'path';

import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateSenderAgreementDto } from './dto/update-sender-agreement.dto';
import { UpdateReceiverAgreementDto } from './dto/update-receiver-agreement.dto';
import { StartAgreementDto } from './dto/start-agreement.dto';
import { BrokerSignAgreementDto } from './dto/broker-sign-agreement.dto';
import { User } from 'src/user/user.model';
import { AgreementStatusType } from './dto/agreement-status-types.enum';
import { UpdateSenderProofDto } from './dto/update-sender-proof.dto';
import { CloseAgreementDto } from './dto/close-agreement.dto';

@Injectable()
export class AgreementService {
  constructor(
    @InjectModel(Agreement) private agreementModel: typeof Agreement,
    private readonly notificationService: NotificationService,
  ) {}

  async createAgreement(dto: CreateAgreementDto): Promise<void> {
    try {
      const agreement = this.agreementModel.build({
        ...dto,
      });

      const savedAgreement = await agreement.save();

      const fullAgreement = await this.agreementModel.findOne({
        where: { id: savedAgreement.id },
        include: [
          {
            model: User,
            as: 'referralSender',
          },
          {
            model: User,
            as: 'referralReceiver',
          },
        ], // Adjust this to match your association configuration
      });

      console.log(fullAgreement);

      const agreementDoc = new PDFDocument();
      const dirPath = path.join(
        './storage/agreements',
        savedAgreement.id.toString(),
      );

      // Check if the directory exists, and if not, create it
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const filePath = path.join(dirPath, 'doc.pdf');
      const writeStream = fs.createWriteStream(filePath);

      agreementDoc.pipe(writeStream);

      agreementDoc.text('Referral Agreement Between Real Estate Agents', {
        align: 'center',
      });

      agreementDoc.moveDown();
      agreementDoc.text('Agreement Overview');
      agreementDoc.text(`Sender Agent: ${fullAgreement.referralSender.name}`);
      agreementDoc.text(
        `License Number: ${fullAgreement.referralSender.licenseNumber}`,
      );
      agreementDoc.text(`Broker Name: ________________________`);
      agreementDoc.text(`Broker Signature: ________________________`);

      agreementDoc.moveDown();
      agreementDoc.text(
        `Receiver Agent: ${fullAgreement.referralReceiver.name}`,
      );
      agreementDoc.text(
        `License Number: ${fullAgreement.referralReceiver.licenseNumber}`,
      );
      agreementDoc.text(`Broker Name: ________________________`);
      agreementDoc.text(`Broker Signature: ________________________`);

      agreementDoc.moveDown();
      agreementDoc.text(`Client Information`);
      agreementDoc.text(`Client Name: ________________________`);
      agreementDoc.text(`Client Contact Information: ________________________`);

      agreementDoc.moveDown();
      agreementDoc.text('Referral Terms');
      agreementDoc.text(
        `Referral Fee: _% of the gross commission earned on the referred transaction.`,
      );
      agreementDoc.text(`Update Intervals: 
        - Initial contact with the client
        - After the first property showing
        - After an offer is made by the client
        - Upon acceptance of an offer
        - At closing`);

      agreementDoc.moveDown();
      agreementDoc.text(
        `Confidentiality: Both agents agree to keep the client's information confidential and not to disclose it to any third party without the client's consent.`,
      );

      agreementDoc.moveDown();
      agreementDoc.text(
        `Duration of Agreement: This agreement shall be effective from the date of signing and shall remain in effect until the referred transaction is completed or the agreement is terminated by either party in writing.`,
      );

      agreementDoc.moveDown();
      agreementDoc.text(
        `Governing Law: This agreement shall be governed by and construed in accordance with the laws of United States.`,
      );

      agreementDoc.end();

      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      console.log(`PDF saved at ${filePath}`);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateAgreementBySender(dto: UpdateSenderAgreementDto): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: dto.id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.status !== AgreementStatusType.Waiting)
        throw new BadRequestException('Agreement already started');

      agreement.referralFeePercentage = dto.referralFeePercentage;
      agreement.statusUpdateInterval = dto.statusUpdateInterval;
      agreement.senderBrokerName = dto.senderBrokerName;
      agreement.senderBrokerEmail = dto.senderBrokerEmail;
      agreement.senderSignature = dto.signature;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralReceiverId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateAgreementByReceiver(
    data: UpdateReceiverAgreementDto,
  ): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: data.id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.status !== AgreementStatusType.Waiting)
        throw new BadRequestException('Agreement already started');

      agreement.receiverBrokerName = data.receiverBrokerName;
      agreement.receiverBrokerEmail = data.receiverBrokerEmail;
      agreement.receiverSignature = data.signature;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralSenderId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAgreementDoc(id: number): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async senderBrokerSignAgreement(data: BrokerSignAgreementDto): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: data.id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.status !== AgreementStatusType.Waiting)
        throw new BadRequestException('Agreement already started');

      agreement.senderBrokerSignature = data.signature;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralReceiverId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async receiverBrokerSignAgreement(
    data: BrokerSignAgreementDto,
  ): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: data.id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.status !== AgreementStatusType.Waiting)
        throw new BadRequestException('Agreement already started');

      agreement.receiverBrokerSignature = data.signature;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralSenderId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async startAgreement(data: StartAgreementDto): Promise<void> {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: data.id },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (data.agentId !== agreement.referralSenderId)
        throw new BadRequestException(
          'Only referral sender can start the agreement',
        );

      if (agreement.status !== AgreementStatusType.Waiting)
        throw new BadRequestException('Agreement already started');

      if (
        !agreement.senderSignature ||
        !agreement.receiverSignature ||
        !agreement.senderBrokerSignature ||
        !agreement.receiverBrokerSignature
      ) {
        throw new BadRequestException(
          'Agreement must be signed by all parties for it to be started',
        );
      }

      agreement.status = AgreementStatusType.Started;

      await agreement.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async senderPaymentProof(
    dto: UpdateSenderProofDto,
    file: Express.Multer.File,
  ) {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: dto.agreementId },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.referralSenderId !== parseInt(dto.userId)) {
        throw new UnauthorizedException(
          'You are not allowed to do this action',
        );
      }

      agreement.senderCheckReceivedProof = file.path;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralSenderId,
        text: 'Payment proof updated by sender',
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async closeAgreement(dto: CloseAgreementDto) {
    try {
      const agreement = await this.agreementModel.findOne({
        where: { id: dto.agreementId },
      });

      if (!agreement) throw new NotFoundException('Agreement does not exist');

      if (agreement.referralSenderId !== dto.userId)
        throw new UnauthorizedException(
          'You are not allowed to edit this agreement',
        );

      if (agreement.senderCheckReceivedProof === null) {
        throw new PreconditionFailedException(
          'Payment proof has to be updated by sender agent before you can close the agreement',
        );
      }

      if (agreement.status === AgreementStatusType.Closed)
        throw new ConflictException('Agreement already closed');

      agreement.status = AgreementStatusType.Closed;

      await agreement.save();

      await this.notificationService.createNotification({
        userId: agreement.referralSenderId,
        text: 'Agreement has been closed',
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });

      await this.notificationService.createNotification({
        userId: agreement.referralReceiverId,
        text: 'Agreement has been closed',
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
