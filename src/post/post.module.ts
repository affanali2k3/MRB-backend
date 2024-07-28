import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostImages } from './post-images.model';
import { Post } from './post.model';

@Module({
  imports: [SequelizeModule.forFeature([PostImages, Post]), PostModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
