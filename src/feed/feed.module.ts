import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PostModule } from 'src/post/post.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/post/post.model';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), PostModule, LikeModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
