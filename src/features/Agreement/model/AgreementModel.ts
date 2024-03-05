import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { AgreementStatus } from "../controller/AgreementController";

@Table({
  tableName: Agreement.TABLE_NAME,
})
export class Agreement extends Model {
  public static TABLE_NAME = "agreements" as string;
  public static ID = "agreement_id" as string;
  public static REFERRAL_SENDER_ID = "agreement_referral_sender_id" as string;
  public static REFERRAL_RECEIVER_ID = "agreement_referral_receiver_id" as string;

  public static SENDER_BROKER_NAME = "sender_broker_name" as string;
  public static SENDER_BROKER_EMAIL = "sender_broker_email" as string;

  public static RECEIVER_BROKER_NAME = "receiver_broker_name" as string;
  public static RECEIVER_BROKER_EMAIL = "receiver_broker_email" as string;

  public static REFERRAL_FEE_PERCENTAGE = "agreement_referral_fee_percentage" as string;

  public static ACCEPTED_BY_SENDER = "agreement_accepted_by_sender" as string;
  public static ACCEPTED_BY_RECEIVER = "agreement_accepted_by_receiver" as string;

  /*
    Specifies after how much time(in days) the receiver will receiver notification to update the status of agreement
  */
  public static STATUS_UPDATES_INTERVAL = "agreement_referral_status_updates_interval" as string;

  /*
    This status is different from the above one because this is the overall agreement status and has only three values
    1. Waiting
    2. Started
    3. Closed
  */
  public static STATUS = "agreement_status" as string;

  /* The following will store paths to the signatures of sender, receiver and both of their brokers*/
  public static SENDER_SIGNATURE = "sender_signature";
  public static RECEIVER_SIGNATURE = "receiver_signature";
  public static SENDER_BROKER_SIGNATURE = "sender_broker_signature";
  public static RECEIVER_BROKER_SIGNATURE = "receiver_broker_signature";

  @Column({
    type: DataType.INTEGER,
    field: Agreement.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: Agreement.REFERRAL_SENDER_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  referralSenderId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Agreement.REFERRAL_RECEIVER_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  referralReceiverId!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: Agreement.ACCEPTED_BY_SENDER,
    defaultValue: false,
  })
  acceptedBySender!: boolean;

  @Column({
    type: DataType.TEXT,
    field: Agreement.STATUS,
    defaultValue: "waiting",
  })
  status!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Agreement.ACCEPTED_BY_RECEIVER,
    defaultValue: false,
  })
  acceptedByReceiver!: boolean;

  @Column({
    type: DataType.INTEGER,
    field: Agreement.REFERRAL_FEE_PERCENTAGE,
    validate: { min: 0, max: 100 }, //Percentage can only be btw 0 and 100
  })
  referralFeePercentage!: number;

  @Column({
    type: DataType.INTEGER,
    field: Agreement.STATUS_UPDATES_INTERVAL,
  })
  statusUpdateInterval!: number;

  @Column({
    type: DataType.TEXT,
    field: Agreement.SENDER_SIGNATURE,
  })
  senderSignature!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.RECEIVER_SIGNATURE,
  })
  receiverSignature!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.SENDER_BROKER_SIGNATURE,
  })
  senderBrokerSignature!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.RECEIVER_BROKER_SIGNATURE,
  })
  receiverBrokerSignature!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.SENDER_BROKER_NAME,
  })
  senderBrokerName!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.SENDER_BROKER_EMAIL,
  })
  senderBrokerEmail!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.RECEIVER_BROKER_NAME,
  })
  receiverBrokerName!: string;

  @Column({
    type: DataType.TEXT,
    field: Agreement.RECEIVER_BROKER_EMAIL,
  })
  receiverBrokerEmail!: string;
}
