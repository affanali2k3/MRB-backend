import {
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Get,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { AgreementService } from './agreement.service';
import { AcceptAgreementData } from './dto/accept-agreement.dto';
import { UpdateSenderAgreementDto } from './dto/update-sender-agreement.dto';
import { UpdateReceiverAgreementDto } from './dto/update-receiver-agreement.dto';
import { BrokerSignAgreementDto } from './dto/broker-sign-agreement.dto';
import * as path from 'path';
import { createReadStream } from 'fs';
import { UpdateSenderProofDto } from './dto/update-sender-proof.dto';
import { CloseAgreementDto } from './dto/close-agreement.dto';

const storage = diskStorage({
  destination: (req, file, cb) => {
    const agreementId: number = req.body.id;
    let folderName: string = 'no folder';
    let tempPath: string = req.path;
    tempPath = tempPath.split('/').pop();
    if (tempPath === 'update-by-sender') {
      folderName = 'sender';
    } else if (tempPath === 'update-by-receiver') {
      folderName = 'receiver';
    } else if (tempPath === 'sender-broker-sign') {
      folderName = 'sender-broker';
    } else if (tempPath === 'receiver-broker-sign') {
      folderName = 'receiver-broker';
    }
    const destinationPath = `./storage/agreements/${agreementId}/signatures/${folderName}`;
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = 'signature.jpg';

    cb(null, uniqueFileName);
  },
});

const storagePaymentProof = diskStorage({
  destination: (req, file, cb) => {
    const agreementId: number = req.body.agreementId;

    const destinationPath = `./storage/agreements/${agreementId}/payment-proof`;
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = 'payment-proof.jpg';

    cb(null, uniqueFileName);
  },
});

@Controller('agreement')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Patch('update-by-sender')
  @UseInterceptors(FileInterceptor('signature', { storage }))
  async updateAgreementBySender(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody: UpdateSenderAgreementDto,
  ) {
    try {
      if (!file)
        throw new HttpException(
          'No signature provided',
          HttpStatus.BAD_REQUEST,
        );
      reqBody.signature = file.path;
      await this.agreementService.updateAgreementBySender(reqBody);
      return { message: 'Agreement updated successfully' };
    } catch (err) {
      if (file) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error while deleting the file', err);
          }
        });
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get()
  async getAgreementDoc(@Query('id') id: string) {
    try {
      await this.agreementService.getAgreementDoc(+id);
      const filePath = path.join('storage', 'agreements', id, 'doc.pdf');
      const file = createReadStream(filePath);
      return new StreamableFile(file, {
        type: 'application/pdf',
        disposition: 'attachment; filename="doc.pdf"',
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('update-by-receiver')
  @UseInterceptors(FileInterceptor('signature', { storage }))
  async updateAgreementByReceiver(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody: UpdateReceiverAgreementDto,
  ) {
    try {
      if (!file)
        throw new HttpException(
          'No signature provided',
          HttpStatus.BAD_REQUEST,
        );
      reqBody.signature = file.path;
      await this.agreementService.updateAgreementByReceiver(reqBody);
      return { message: 'Agreement updated successfully' };
    } catch (err) {
      if (file) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error while deleting the file', err);
          }
        });
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('sender-broker-sign')
  @UseInterceptors(FileInterceptor('signature', { storage }))
  async senderBrokerSignAgreement(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody: BrokerSignAgreementDto,
  ) {
    try {
      if (!file)
        throw new HttpException(
          'No signature provided',
          HttpStatus.BAD_REQUEST,
        );
      reqBody.signature = file.path;
      await this.agreementService.senderBrokerSignAgreement(reqBody);
      return { message: 'Agreement signed by sender broker successfully' };
    } catch (err) {
      if (file) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error while deleting the file', err);
          }
        });
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('receiver-broker-sign')
  @UseInterceptors(FileInterceptor('signature', { storage }))
  async receiverBrokerSignAgreement(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody: BrokerSignAgreementDto,
  ) {
    try {
      if (!file)
        throw new HttpException(
          'No signature provided',
          HttpStatus.BAD_REQUEST,
        );
      reqBody.signature = file.path;
      await this.agreementService.receiverBrokerSignAgreement(reqBody);
      return { message: 'Agreement signed by receiver broker successfully' };
    } catch (err) {
      if (file) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error while deleting the file', err);
          }
        });
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('sender-payment-proof')
  @UseInterceptors(FileInterceptor('proof', { storage: storagePaymentProof }))
  async senderPaymentProof(
    @Body() dto: UpdateSenderProofDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      await this.agreementService.senderPaymentProof(dto, file);

      return { message: 'Payment proof updated by sender' };
    } catch (err) {
      if (file) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error while deleting the file', err);
          }
        });
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('start')
  async startAgreement(@Body() reqBody: AcceptAgreementData) {
    try {
      await this.agreementService.startAgreement(reqBody);
      return { message: 'Agreement started successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Patch('close')
  async closeAgreement(@Body() dto: CloseAgreementDto) {
    try {
      await this.agreementService.closeAgreement(dto);
      return { message: 'Agreement closed successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
