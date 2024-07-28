import {
  Model,
  Table,
  Column,
  HasOne,
  DataType,
  HasMany,
  DefaultScope,
  Scopes,
} from 'sequelize-typescript';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { AgentToAgentReview } from 'src/agent-to-agent-review/agent-to-agent-review.model';
import { Agreement } from 'src/agreement/agreement.model';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';

@DefaultScope(() => ({
  attributes: { exclude: [User.PASSWORD] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: [User.PASSWORD] },
  },
}))
@Table
export class User extends Model {
  public static PASSWORD = 'password' as string;
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  biography: string;

  @Column
  licenseNumber: string;

  @Column({
    type: DataType.INTEGER,
  })
  teamMembers: number;

  @Column
  licenseState: string;

  @Column({
    type: DataType.INTEGER,
    validate: { min: 1920, max: 2026 },
  })
  licenseYear: number;

  @Column
  photo: string;

  @Column
  coverPhoto: string;

  @Column
  phone: string;

  @HasOne(() => AgentAnalytic)
  agentAnalytic: AgentAnalytic;

  @HasMany(() => ReferralOpenForm)
  referralOpenForms: ReferralOpenForm[];

  @HasMany(() => Agreement, Agreement.REFERRAL_SENDER_ID)
  sentAgreements: Agreement[];

  @HasMany(() => Agreement, Agreement.REFERRAL_RECEIVER_ID)
  receivedAgreements: Agreement[];

  @HasMany(() => AgentToAgentReview, AgentToAgentReview.REVIEWER_ID)
  reviewerIds: AgentToAgentReview[];

  @HasMany(() => AgentToAgentReview, AgentToAgentReview.SUBJECT_ID)
  subjectIds: AgentToAgentReview[];
}
