import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PostModule } from 'src/post/post.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './like.model';
import { Post } from 'src/post/post.model';

@Module({
  imports: [PostModule, SequelizeModule.forFeature([Like, Post])],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
