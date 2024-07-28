import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from 'src/user/user.model';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('name/:userName')
  async searchUser(
    @Param('userName') userName: string,
  ): Promise<{ message: string; data: User[] }> {
    try {
      const users = await this.searchService.searchUser(userName);
      return {
        message: 'Users searched successfully',
        data: users,
      };
    } catch (err: any) {
      throw new HttpException(
        `Failed to search users: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
