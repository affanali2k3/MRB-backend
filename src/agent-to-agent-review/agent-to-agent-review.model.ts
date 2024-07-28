import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { Agreement } from 'src/agreement/agreement.model';
import { User } from 'src/user/user.model';

@Table
export class AgentToAgentReview extends Model {
  public static REVIEWER_ID = 'reviewerId' as string;
  public static SUBJECT_ID = 'subjectId' as string;
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  review: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0, max: 5 },
  })
  rating: number;

  @ForeignKey(() => Agreement)
  @Column({
    allowNull: false,
  })
  agreementId: number;

  @BelongsTo(() => Agreement)
  agreement: Agreement;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  reviewerId: number;

  @BelongsTo(() => User, AgentToAgentReview.REVIEWER_ID)
  reviewer: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  subjectId: number;

  @BelongsTo(() => User, AgentToAgentReview.SUBJECT_ID)
  subject: User;
}
