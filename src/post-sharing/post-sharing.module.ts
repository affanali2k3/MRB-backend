import { Module } from '@nestjs/common';
import { PostSharingService } from './post-sharing.service';
import { PostSharingController } from './post-sharing.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostShare } from './post-sharing.model';

@Module({
  imports: [SequelizeModule.forFeature([PostShare])],
  controllers: [PostSharingController],
  providers: [PostSharingService],
})
export class PostSharingModule {}
