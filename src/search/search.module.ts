import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
