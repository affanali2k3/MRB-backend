import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
  tableName: AgentAnalytic.TABLE_NAME,
})
export class AgentAnalytic extends Model {
  public static TABLE_NAME = "agent_analytics" as string;
  public static ID = "id" as string;
  public static USER_ID = "user_id" as string;
  public static REFERRALS_SENT = "referrals_sent" as string;
  public static REFERRALS_RECEIVED = "referrals_received" as string;
  public static YEARS_OF_EXPERIENCE = "years_of_experience" as string;
  public static HOUSES_SOLD = "houses_sold" as string;
  public static HOUSES_BOUGHT = "houses_bought" as string;
  public static AGENT_TO_AGENT_RATING_SCORE = "agent_to_agent_rating_score" as string;
  public static AGENT_TO_AGENT_RATING = "agent_to_agent_rating" as string;
  public static AGENT_TO_AGENT_RATING_NUMBER = "agent_to_agent_rating_number" as string;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.REFERRALS_SENT,
    allowNull: false,
  })
  referralsSent!: number;

  @Column({
    type: DataType.DOUBLE,
    field: AgentAnalytic.YEARS_OF_EXPERIENCE,
    allowNull: false,
  })
  yearsOfExperience!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.HOUSES_BOUGHT,
    allowNull: false,
  })
  housesBought!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.HOUSES_SOLD,
    allowNull: false,
  })
  housesSold!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.REFERRALS_RECEIVED,
    allowNull: false,
  })
  referralsReceived!: number;

  @Column({
    type: DataType.FLOAT,
    field: AgentAnalytic.AGENT_TO_AGENT_RATING_SCORE,
    allowNull: false,
  })
  agentToAgentRatingScore!: number;

  @Column({
    type: DataType.FLOAT,
    field: AgentAnalytic.AGENT_TO_AGENT_RATING,
    allowNull: false,
  })
  agentToAgentRating!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.AGENT_TO_AGENT_RATING_NUMBER,
    allowNull: false,
  })
  agentToAgentRatingNumber!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentAnalytic.USER_ID,
    unique: true,
    references: { model: User.TABLE_NAME, key: User.ID },
  })
  userId!: number;
}
