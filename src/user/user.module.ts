import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { UserPreferenceModule } from 'src/user-preference/user-preference.module';
import { PostModule } from 'src/post/post.module';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, AgentAnalytic]),
    forwardRef(() => AgentAnalyticModule),
    UserPreferenceModule,
    PostModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
