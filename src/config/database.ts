import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../features/UserProfile/model/User";
import { UserAssociates } from "../features/UserAssociates/model/UserAssociates";
import { Message } from "../features/Chat/model/MessageModel";
import { Post } from "../features/Post/model/PostModel";
import { PostImages } from "../features/Post/model/PostImages";
import { Like } from "../features/Like/model/LikeModel";
import { Comment } from "../features/Comment/model/CommentModel";
import { SenderAgentDirectForm } from "../features/SenderAgentForm/model/SenderAgentDirectForm";
import { SenderAgentOpenForm } from "../features/SenderAgentForm/model/SenderAgentOpenForm";
import { ReceiverAgentDirectForm } from "../features/ReceiverAgentForm/model/ReceiverAgentDirectFormModel";
import { ReceiverAgentOpenForm } from "../features/ReceiverAgentForm/model/ReceiverAgentOpenForm";
import { AgentInviteCode } from "../features/AgentInviteCode/model/AgentInviteCode";
import { AgentInvitee } from "../features/AgentInvitee/model/AgentInviteeModel";
import { AgentAnalytic } from "../features/AgentAnalytics/model/AgentAnalyticsModel";
import { AgentToAgentReview } from "../features/AgentReviews/model/AgentToAgentReviewModel";
import { Chat } from "../features/Chat/model/ChatModel";
import UserPreferences from "../features/UserPreference/model/UserPreferenceModel";
import { Agreement } from "../features/Agreement/model/AgreementModel";
import { Notification } from "../features/Notifications/model/NotificationModel";
import { AgreementStatus } from "../features/AgreementStatus/model/AgreementStatusModel";

dotenv.config(); // Load environment variables from .env file

class Database {
  public sequelize: Sequelize | undefined;

  // Environment variables for PostgreSQL configuration
  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connectToPostgreSQL(); // Call the method to establish PostgreSQL connection
  }

  private async connectToPostgreSQL() {
    // Create a Sequelize instance with PostgreSQL connection details and models
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      logging: false,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      dialect: "postgres", // Use PostgreSQL dialect
      models: [
        User,
        UserAssociates,
        Post,
        PostImages,
        Message,
        Like,
        Comment,
        SenderAgentDirectForm,
        SenderAgentOpenForm,
        ReceiverAgentDirectForm,
        ReceiverAgentOpenForm,
        AgentInviteCode,
        AgentInvitee,
        AgentAnalytic,
        AgentToAgentReview,
        Chat,
        UserPreferences,
        Agreement,
        AgreementStatus,
        Notification,
      ],
    });

    User.hasMany(SenderAgentOpenForm, {
      foreignKey: SenderAgentOpenForm.SENDER_AGENT,
    });
    User.hasMany(SenderAgentDirectForm, {
      foreignKey: SenderAgentDirectForm.SENDER_AGENT,
    });
    SenderAgentOpenForm.belongsTo(User, {
      foreignKey: SenderAgentOpenForm.SENDER_AGENT,
    });
    SenderAgentDirectForm.belongsTo(User, {
      foreignKey: SenderAgentDirectForm.SENDER_AGENT,
    });

    User.hasMany(UserAssociates, {
      foreignKey: UserAssociates.USER_ID,
    });

    UserAssociates.belongsTo(User, {
      foreignKey: UserAssociates.USER_ID,
    });

    SenderAgentOpenForm.hasOne(ReceiverAgentOpenForm, {
      foreignKey: ReceiverAgentOpenForm.SENDER_AGENT_FORM_ID,
    });
    ReceiverAgentOpenForm.belongsTo(SenderAgentOpenForm, {
      foreignKey: ReceiverAgentOpenForm.SENDER_AGENT_FORM_ID,
    });

    SenderAgentDirectForm.hasOne(ReceiverAgentDirectForm, {
      foreignKey: ReceiverAgentDirectForm.SENDER_AGENT_DIRECT_FORM_ID,
    });
    ReceiverAgentDirectForm.belongsTo(SenderAgentDirectForm, {
      foreignKey: ReceiverAgentDirectForm.SENDER_AGENT_DIRECT_FORM_ID,
    });

    User.hasMany(Chat, { foreignKey: Chat.USER_TWO_ID });
    Chat.belongsTo(User, { foreignKey: Chat.USER_TWO_ID });

    User.hasMany(Post, { foreignKey: Post.USER_ID });
    Post.belongsTo(User, { foreignKey: Post.USER_ID });

    User.hasOne(AgentAnalytic, { foreignKey: AgentAnalytic.USER_ID });
    AgentAnalytic.belongsTo(User, { foreignKey: AgentAnalytic.USER_ID });

    // Authenticate the connection and handle success or failure
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Postgres has been connected");
      })
      .catch((err) => {
        console.log(`Postgres connection Failed. ${err}`);
      });
  }
}

export default Database; // Export the Database class as the default export
