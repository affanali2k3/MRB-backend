import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { AgreementStatus } from "../controller/AgreementController";

export class AgreementModel extends Model {
  public static TABLE_NAME = "agreements" as string;
  public static ID = "agreement_id" as string;
  public static REFERRAL_SENDER_ID = "agreement_referral_sender_id" as string;
  public static REFERRAL_RECEIVER_ID = "agreement_referral_receiver_id" as string;
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
  public static STATUS = "agreement_referral_status_updates_interval" as string;

  @Column({
    type: DataType.INTEGER,
    field: AgreementModel.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgreementModel.REFERRAL_SENDER_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  referralSenderId!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgreementModel.REFERRAL_RECEIVER_ID,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  referralReceiverId!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: AgreementModel.ACCEPTED_BY_SENDER,
    defaultValue: false,
  })
  acceptedBySender!: boolean;

  @Column({
    type: DataType.STRING,
    field: AgreementModel.STATUS,
    defaultValue: "waiting",
  })
  status!: AgreementStatus;

  @Column({
    type: DataType.BOOLEAN,
    field: AgreementModel.ACCEPTED_BY_RECEIVER,
    defaultValue: false,
  })
  acceptedByReceiver!: boolean;

  @Column({
    type: DataType.INTEGER,
    field: AgreementModel.REFERRAL_FEE_PERCENTAGE,
    validate: { min: 0, max: 100 }, //Percentage can only be btw 0 and 100
  })
  referralFeePercentage!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgreementModel.STATUS_UPDATES_INTERVAL,
  })
  statusUpdateInterval!: number;
}
