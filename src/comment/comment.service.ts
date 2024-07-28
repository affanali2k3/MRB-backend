import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { Post } from '../post/post.model';
import { PostService } from 'src/post/post.service';

// DTOs
export class CreateCommentDto {
  userId: number;
  postId: number;
  text: string;
}

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(Post) private postModel: typeof Post,
    private readonly postService: PostService,
  ) {}

  async saveComment(dto: CreateCommentDto): Promise<number> {
    try {
      const comment = this.commentModel.build({
        postId: dto.postId,
        userId: dto.userId,
        text: dto.text,
      });

      const savedComment = await comment.save();

      const post = await this.postModel.findOne({ where: { id: dto.postId } });

      if (!post) throw new NotFoundException('Post not found');

      // Uncomment if you need to increment the post's comment count
      // post.comments = post.comments + 1;

      await post.save();

      await this.postService.createCommentedOnPost(
        dto.userId,
        dto.postId,
        dto.text,
      );

      return savedComment.id;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteComment(commentId: number, postId: number): Promise<void> {
    try {
      const comment = await this.commentModel.findOne({
        where: { id: commentId },
      });

      if (!comment) throw new NotFoundException('Comment not found');

      await comment.destroy();

      const post = await this.postModel.findOne({ where: { id: postId } });

      if (!post) return;

      if (comment.postId !== postId)
        throw new BadRequestException(
          'Comment post id does not match the real post id',
        );

      post.comments = post.comments - 1;

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getPostComments(postId: number): Promise<Comment[]> {
    try {
      const comments = await this.commentModel.findAll({
        where: { postId: postId },
      });
      return comments;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
