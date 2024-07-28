import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AgentAnalyticModule } from './agent-analytic/agent-analytic.module';
import { AgentInviteCodeModule } from './agent-invite-code/agent-invite-code.module';
import { AgentInviteeModule } from './agent-invitee/agent-invitee.module';
import { AgentToAgentReviewModule } from './agent-to-agent-review/agent-to-agent-review.module';
import { AgreementModule } from './agreement/agreement.module';
import { AgreementStatusModule } from './agreement-status/agreement-status.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';
import { ProposalFormModule } from './proposal-form/proposal-form.module';
import { ReferralFormModule } from './referral-form/referral-form.module';
import { UserAssociateModule } from './user-associate/user-associate.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { PostSharingModule } from './post-sharing/post-sharing.module';
import { ReferralCentreModule } from './referral-centre/referral-centre.module';
import { RegistrationModule } from './registration/registration.module';
import { SearchModule } from './search/search.module';
import { FeedModule } from './feed/feed.module';
import { RecommendModule } from './recommend/recommend.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // models: [User],
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    MulterModule.register({
      dest: process.env.STORAGE,
    }),
    UserModule,
    AgentAnalyticModule,
    AgentInviteCodeModule,
    AgentInviteeModule,
    AgentToAgentReviewModule,
    AgreementModule,
    AgreementStatusModule,
    ChatModule,
    CommentModule,
    LikeModule,
    NotificationModule,
    PostModule,
    ProposalFormModule,
    ReferralFormModule,
    UserAssociateModule,
    UserPreferenceModule,
    PostSharingModule,
    ReferralCentreModule,
    RegistrationModule,
    SearchModule,
    FeedModule,
    RecommendModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
