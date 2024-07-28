import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostModule } from 'src/post/post.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/post/post.model';
import { Comment } from './comment.model';

@Module({
  imports: [PostModule, SequelizeModule.forFeature([Comment, Post])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
