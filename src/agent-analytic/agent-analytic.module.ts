import { forwardRef, Module } from '@nestjs/common';
import { AgentAnalyticService } from './agent-analytic.service';
import { AgentAnalyticController } from './agent-analytic.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AgentAnalytic } from './agent-analytic.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AgentAnalytic, User]),
    forwardRef(() => UserModule),
  ],
  controllers: [AgentAnalyticController],
  providers: [AgentAnalyticService],
  exports: [AgentAnalyticService],
})
export class AgentAnalyticModule {}
