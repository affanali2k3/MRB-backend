import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { AgreementStatusType } from './dto/agreement-status-types.enum';

@Table
export class Agreement extends Model {
  public static REFERRAL_SENDER_ID = 'referralSenderId' as string;
  public static REFERRAL_RECEIVER_ID = 'referralReceiverId' as string;
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  referralSenderId: number;

  @BelongsTo(() => User, Agreement.REFERRAL_SENDER_ID)
  referralSender: User;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  referralReceiverId: number;

  @BelongsTo(() => User, Agreement.REFERRAL_RECEIVER_ID)
  referralReceiver: User;

  @Column({
    type: DataType.TEXT,
  })
  senderCheckReceivedProof: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: AgreementStatusType.Waiting,
  })
  status: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: false,
  })
  receiverPropertyClosedProof: string;

  @Column({
    validate: { min: 0, max: 100 },
  })
  referralFeePercentage: number;

  @Column
  statusUpdateInterval: number;

  @Column({
    type: DataType.TEXT,
  })
  senderSignature: string;

  @Column({
    type: DataType.TEXT,
  })
  receiverSignature: string;

  @Column({
    type: DataType.TEXT,
  })
  senderBrokerSignature: string;

  @Column({
    type: DataType.TEXT,
  })
  receiverBrokerSignature: string;

  @Column
  senderBrokerName: string;

  @Column
  senderBrokerEmail: string;

  @Column
  receiverBrokerName: string;

  @Column
  receiverBrokerEmail: string;
}
