import { Module } from '@nestjs/common';
import { UserAssociateService } from './user-associate.service';
import { UserAssociateController } from './user-associate.controller';
import { AgentAnalyticModule } from 'src/agent-analytic/agent-analytic.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserAssociates } from './user-associate.model';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserAssociates, AgentAnalytic]),
    AgentAnalyticModule,
  ],
  controllers: [UserAssociateController],
  providers: [UserAssociateService],
})
export class UserAssociateModule {}
