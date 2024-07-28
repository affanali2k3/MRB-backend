import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class AgentAnalytic extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  referralsSent: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  yearsOfExperience: number;

  @Column({
    allowNull: false,
  })
  housesBought: number;

  @Column({
    allowNull: false,
  })
  housesSold: number;

  @Column({
    allowNull: false,
  })
  referralsReceived: number;

  @Column({
    allowNull: false,
  })
  agentToAgentRatingScore: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  agentToAgentRating: number;

  @Column({
    allowNull: false,
  })
  agentToAgentRatingNumber: number;

  @ForeignKey(() => User)
  @Column({
    unique: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
