import {
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostSharingService } from './post-sharing.service';

@Controller('post-share')
export class PostSharingController {
  constructor(private readonly postShareService: PostSharingService) {}

  // @Post(':userEmail/:postId')
  // async sharePost(
  //   @Param('userEmail') userEmail: string,
  //   @Param('postId') postId: number,
  // ) {
  //   try {
  //     await this.postShareService.sharePost({ postId, userEmail });
  //     return { message: 'Post shared successfully' };
  //   } catch (err: any) {
  //     throw new HttpException(
  //       `Cannot share post: ${err.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Get(':userId')
  async getPostSharedByUser(@Param('userId') userId: string) {
    try {
      const postShared = await this.postShareService.getAllPostsByUser(+userId);
      return {
        message: 'Post retrieved successfully',
        postShared,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot retrieve post: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
