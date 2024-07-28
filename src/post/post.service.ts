import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { SavePostDto } from './dto/save-post.dto';
import { User } from 'src/user/user.model';
import { PostImages } from './post-images.model';
import { PostTypes } from './dto/post-types.enum';

// DTOs

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    @InjectModel(PostImages) private postImagesModel: typeof PostImages,
  ) {}

  async savePost(dto: SavePostDto, uniqueFolderName: string): Promise<void> {
    try {
      const post = this.postModel.build({
        text: dto.postText,
        userId: dto.userId,
        name: uniqueFolderName,
        type: PostTypes.DEFAULT,
      });

      const newPost = await post.save();

      if (dto.fileNames === null) return;

      for (const fileName of dto.fileNames) {
        const postImage = this.postImagesModel.build({
          postId: newPost.id,
          image_name: fileName,
        });
        await postImage.save();
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createMadeReferralPost(
    userId: number,
    referralId: number,
  ): Promise<void> {
    try {
      const post = this.postModel.build({
        userId: userId,
        madeReferralId: referralId,
        type: PostTypes.MADE_REFERRAL,
      });

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createUpdatedProfilePost(userId: number): Promise<void> {
    try {
      const post = this.postModel.build({
        userId: userId,
        type: PostTypes.UPDATED_PROFILE,
      });

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createLikedPost(userId: number, postId: number): Promise<void> {
    try {
      const post = this.postModel.build({
        userId: userId,
        sharedLikedCommentedId: postId,
        type: PostTypes.LIKED_POST,
      });

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createCommentedOnPost(
    userId: number,
    postId: number,
    comment: string,
  ): Promise<void> {
    try {
      const post = this.postModel.build({
        userId: userId,
        text: comment,
        sharedLikedCommentedId: postId,
        type: PostTypes.COMMENTED_ON_POST,
      });

      await post.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllPosts(userId: number): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
          },
          {
            model: PostImages,
          },
        ],
      });
      return posts;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getImageNamesOfPost(postId: number): Promise<string[]> {
    try {
      const imageNames = (
        await this.postImagesModel.findAll({
          where: { postId: postId },
          attributes: ['image_name'],
        })
      ).map((postImage) => postImage.image_name);
      return imageNames;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      const post = await this.postModel.findOne({ where: { id: postId } });

      if (!post) throw new NotFoundException('Post does not exist');

      await post.destroy();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
