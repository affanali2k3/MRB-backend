import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class ReferralDirectForm extends Model {
  public static SENDER_AGENT_ID = 'senderAgentId' as string;
  public static SENDER_AGENT = 'senderAgent' as string;
  public static RECEIVER_AGENT = 'receiverAgent' as string;
  public static RECEIVER_AGENT_ID = 'receiverAgentId' as string;
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: ReferralDirectForm.SENDER_AGENT_ID,
  })
  senderAgentId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: ReferralDirectForm.RECEIVER_AGENT_ID,
  })
  receiverAgentId: number;

  @Column({
    allowNull: false,
  })
  isBuyer: boolean;

  @Column({
    allowNull: false,
  })
  city: string;

  @Column({
    allowNull: false,
  })
  state: string;

  @Column({
    allowNull: false,
  })
  providence: string;

  @Column({
    allowNull: false,
  })
  timeAmount: number;

  @Column({
    type: DataType.TEXT,
  })
  details: string;

  @Column({
    allowNull: false,
  })
  typeOfHouse: string;

  @Column({
    allowNull: false,
  })
  price: number;

  @BelongsTo(() => User, {
    as: ReferralDirectForm.SENDER_AGENT,
    foreignKey: ReferralDirectForm.SENDER_AGENT_ID,
  })
  sender: User;

  @BelongsTo(() => User, {
    as: ReferralDirectForm.RECEIVER_AGENT,
    foreignKey: ReferralDirectForm.RECEIVER_AGENT_ID,
  })
  receiver: User;
}
