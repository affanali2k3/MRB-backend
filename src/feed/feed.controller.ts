import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('get')
  async getFeedForUser(@Req() req: Request, @Query() query: any) {
    try {
      const userId: number = parseInt(query.userId as string);
      const page: number = parseInt(query.page as string);

      const postsPerPage: number = 3;

      const skipPosts: number = (page - 1) * postsPerPage;

      // Retrieve posts for the user's feed using the FeedRepo
      const posts = await this.feedService.getFeedForUser({
        userId: userId,
        skipPosts: skipPosts,
        postsPerPage: postsPerPage,
      });

      return {
        message: 'Got feed successfully',
        data: posts,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get feed: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
