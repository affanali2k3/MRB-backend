import { Injectable } from '@nestjs/common';

import { Post } from 'src/post/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { literal, Op } from 'sequelize';
import { User } from 'src/user/user.model';
import { PostService } from 'src/post/post.service';
import { LikeService } from 'src/like/like.service';
import { PostImages } from 'src/post/post-images.model';

class PostWithImages {
  constructor(
    postId: number,
    comments: number,
    posterName: string,
    likes: number,
    likeId: number | null,
    text: string,
    name: string,
    userId: number,
    createdAt: string,
    updatedAt: string,
    imagesName: string[],
  ) {
    this.postId = postId;
    this.likes = likes;
    this.comments = comments;
    this.posterName = posterName;
    this.likeId = likeId;
    this.text = text;
    this.name = name;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imagesName = imagesName;
  }
  postId: number;
  comments: number;
  posterName: string;
  likes: number;
  likeId: number | null;
  text: string;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  imagesName: string[] | null;
}

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Post) private model: typeof Post,
    private readonly postService: PostService,
    private readonly likeService: LikeService,
  ) {}
  async getFeedForUser({
    userId,
    skipPosts,
    postsPerPage,
  }: {
    userId: number;
    skipPosts: number;
    postsPerPage: number;
  }): Promise<Post[]> {
    try {
      // Query to fetch posts for the user's feed based on their associates
      const posts: Post[] = await Post.findAll({
        where: {
          userId: {
            [Op.in]: literal(`(
                            SELECT "associateId"
                            FROM "UserAssociates"
                            WHERE "userId" = '${userId}' AND status = 'Accepted'
                            UNION
                            SELECT "userId"
                            FROM "UserAssociates"
                            WHERE "associateId" = '${userId}' AND status = 'Accepted'
                        ) ORDER BY "createdAt" DESC`),
          },
        },
        include: [
          {
            model: User,
          },
          {
            model: PostImages,
          },
        ],
        offset: skipPosts, // Offset for pagination
        limit: postsPerPage, // Limit for pagination
      });

      return posts;
    } catch (err) {
      throw new Error(`${err}`); // Throw an error if fetching the feed fails
    }
  }
}
