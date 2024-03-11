import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { Agreement } from "../../Agreement/model/AgreementModel";

@Table({
  indexes: [
    {
      name: AgentToAgentReview.UNIQUE_CONSTRAINT_REVIEWER_SUBJECT,
      unique: true,
      fields: [AgentToAgentReview.REVIEWER_ID, AgentToAgentReview.SUBJECT_ID, AgentToAgentReview.AGREEMENT_ID],
    },
  ],
  tableName: AgentToAgentReview.TABLE_NAME,
})
export class AgentToAgentReview extends Model {
  public static TABLE_NAME = "agent_to_agent_reviews" as string;
  public static ID = "id" as string;

  // The text content
  public static REVIEW = "review" as string;

  // Rating out of 5
  public static RATING = "rating" as string;

  // The agent who is being given the review
  public static SUBJECT_ID = "subject_id" as string;

  // The person who is giving the review
  public static REVIEWER_ID = "reviewer_id" as string;

  public static AGREEMENT_ID = "agreement_id" as string;

  // Constraint so that one agent cannot give review to another agent multiple times
  public static UNIQUE_CONSTRAINT_REVIEWER_SUBJECT = "unique_constraint_reviewer_subject" as string;

  @Column({
    type: DataType.INTEGER,
    field: AgentToAgentReview.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    field: AgentToAgentReview.REVIEW,
  })
  review!: string;

  @Column({
    type: DataType.FLOAT,
    field: AgentToAgentReview.RATING,
    allowNull: false,
  })
  rating!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentToAgentReview.AGREEMENT_ID,
    references: { model: Agreement.TABLE_NAME, key: Agreement.ID },
    allowNull: false,
  })
  agreementId!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentToAgentReview.REVIEWER_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  reviewerId!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgentToAgentReview.SUBJECT_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  subjectId!: number;
}
