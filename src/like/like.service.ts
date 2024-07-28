import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './like.model';
import { Post } from 'src/post/post.model';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { PostService } from 'src/post/post.service';

// DTOs
export class SaveLikeDto {
  userId: number;
  postId: number;
}

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private likeModel: typeof Like,
    @InjectModel(Post) private postModel: typeof Post,
    private readonly postService: PostService,
  ) {}

  async saveLike(dto: SaveLikeDto): Promise<void> {
    try {
      const like = this.likeModel.build({
        postId: dto.postId,
        userId: dto.userId,
      });

      await like.save();

      await this.postService.createLikedPost(dto.userId, dto.postId);

      const post = await this.postModel.findOne({ where: { id: dto.postId } });

      if (!post) throw new NotFoundException('Post not found');

      post.likes = post.likes + 1;

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getLike(postId: number, userId: number): Promise<number | null> {
    try {
      const like = await this.likeModel.findOne({
        where: { postId: postId, userId: userId },
      });

      if (!like) return null;

      return like.id;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async removeLike(dto: DeleteLikeDto): Promise<void> {
    try {
      const like = await this.likeModel.findOne({ where: { id: dto.likeId } });

      if (!like) throw new NotFoundException('Like not found');

      const post = await this.postModel.findOne({ where: { id: dto.postId } });

      if (!post) throw new NotFoundException('Post not found');

      if (like.postId !== dto.postId)
        throw new BadRequestException(
          'Like post id does not match the real post id',
        );

      post.likes = post.likes - 1;

      await post.save();

      await like.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getPostLikes(postId: number): Promise<Like[]> {
    try {
      const likes = await this.likeModel.findAll({ where: { postId: postId } });
      return likes;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
