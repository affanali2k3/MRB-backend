import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/')
  async saveLike(@Body() createLikeDto: CreateLikeDto) {
    try {
      await this.likeService.saveLike(createLikeDto);
      return { message: 'Like saved successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Cannot save like: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete')
  async removeLike(@Body() removeLikeDto: DeleteLikeDto) {
    try {
      await this.likeService.removeLike(removeLikeDto);
      return { message: 'Like deleted successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Cannot delete like: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:postId')
  async getPostLikes(@Param('postId') postId: string) {
    try {
      const likes = await this.likeService.getPostLikes(+postId);
      return {
        message: 'Got post likes successfully',
        data: likes,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get post likes: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
