import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserAssociateService } from './user-associate.service';
import { RequestDto } from './dto/request.dto';
import { AssociateDto } from './dto/associate.dto';

@Controller('user-associates')
export class UserAssociateController {
  constructor(private readonly userAssociatesService: UserAssociateService) {}

  @Post('send')
  async sendRequest(@Body() reqBody: RequestDto) {
    try {
      if (reqBody.senderId === reqBody.receiverId) {
        throw new HttpException(
          'Cannot be associate with yourself',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userAssociatesService.sendRequest(reqBody);
      return { message: 'Request sent successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to send request: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('accept')
  async acceptRequest(@Body() reqBody: RequestDto) {
    try {
      await this.userAssociatesService.acceptRequest(reqBody);
      return { message: 'Request accepted successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to accept request: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('reject')
  async declineRequest(@Body() reqBody: RequestDto) {
    try {
      await this.userAssociatesService.declineRequest(reqBody);
      return { message: 'Request declined successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to decline request: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('cancel')
  async cancelRequest(@Body() reqBody: RequestDto) {
    try {
      await this.userAssociatesService.cancelRequest(reqBody);
      return { message: 'Request cancelled successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to cancel request: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all')
  async getAllAssociates(@Query('userId') id: string) {
    try {
      const associates = await this.userAssociatesService.getAllAssociates(+id);
      return {
        message: 'Got associates successfully',
        data: associates,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get associates: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('remove')
  async removeAssociate(@Body() reqBody: AssociateDto) {
    try {
      await this.userAssociatesService.removeAssociate(reqBody);
      return { message: 'Removed associate successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to remove associate: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('status')
  async checkRequestStatusWithUser(@Body() reqBody: AssociateDto) {
    try {
      const userAssociate =
        await this.userAssociatesService.checkRequestStatusWithUser(reqBody);
      return {
        message: 'Got status successfully',
        data: userAssociate,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to get request status: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
