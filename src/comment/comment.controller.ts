import {
  Controller,
  Get,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentService, CreateCommentDto } from './comment.service';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/post.model';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  async saveComment(@Body() dto: CreateCommentDto) {
    try {
      const commentId = await this.commentService.saveComment(dto);

      const post: Post | null = await Post.findOne({
        where: { id: dto.postId },
      });

      if (!post)
        throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);

      post.comments += 1;
      await post.save();

      return {
        message: 'Comment saved successfully',
        data: commentId,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot save comment: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete')
  async deleteComment(
    @Query('commentId') commentIdString: string,
    @Query('postId') postIdString: string,
  ) {
    try {
      const commentId = parseInt(commentIdString);
      const postId = parseInt(postIdString);

      await this.commentService.deleteComment(commentId, postId);

      return { message: 'Comment deleted successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Failed to delete comment: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:postId')
  async getPostComments(@Param('postId') postIdString: string) {
    try {
      const postId = parseInt(postIdString);
      const comments = await this.commentService.getPostComments(postId);

      return {
        message: 'Got post comments successfully',
        data: comments,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get post comments: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
