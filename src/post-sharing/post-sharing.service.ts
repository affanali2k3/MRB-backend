import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostShare } from './post-sharing.model';

// DTOs
export class SavePostShareDto {
  userId: number;
  postId: number;
}

@Injectable()
export class PostSharingService {
  constructor(
    @InjectModel(PostShare) private postShareModel: typeof PostShare,
  ) {}

  // Method to retrieve all posts shared by a specific user
  async getAllPostsByUser(userId: number): Promise<PostShare[]> {
    try {
      const posts = await this.postShareModel.findAll({
        where: { userId: userId },
      });
      return posts;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Method to save a new post share record
  async savePostShare(dto: SavePostShareDto): Promise<void> {
    try {
      const postShare = this.postShareModel.build({
        userId: dto.userId,
        postId: dto.postId,
      });

      await postShare.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
