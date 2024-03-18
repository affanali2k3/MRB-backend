import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { SenderAgentDirectForm } from "../../SenderAgentForm/model/SenderAgentDirectForm";
import UserAssociates from "../../UserAssociates/model/UserAssociates";
import { AgentInviteCode } from "../../AgentInviteCode/model/AgentInviteCode";
import { Agreement } from "../../Agreement/model/AgreementModel";

@Table({
  tableName: Notification.TABLE_NAME,
})
export class Notification extends Model {
  public static TABLE_NAME = "notifications" as string;

  public static ID = "id" as string;
  public static USER_ID = "user_id" as string;
  public static TYPE = "type" as string;
  // public static IMAGE = "image" as string;
  public static REFERRAL_POSTED_ID = "referral_posted_id" as string;
  public static REFERRAL_RECEIVED_ID = "referral_received_id" as string;
  public static ASSOCIATION_REQUEST_ID = "association_request_id" as string;
  public static GOT_INVITE_ID = "got_invite_id" as string;
  public static AGREEMENT_UPDATED_ID = "agreement_updated_id" as string;

  @Column({
    type: DataType.INTEGER,
    field: Notification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: Notification.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    field: Notification.TYPE,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    field: Notification.REFERRAL_POSTED_ID,
    references: { model: SenderAgentOpenForm, key: SenderAgentOpenForm.ID },
  })
  referralPostedId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Notification.REFERRAL_RECEIVED_ID,
    references: { model: SenderAgentDirectForm, key: SenderAgentDirectForm.ID },
  })
  referralReceivedId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Notification.ASSOCIATION_REQUEST_ID,
    references: { model: UserAssociates, key: UserAssociates.ID },
  })
  assocationRequestId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Notification.GOT_INVITE_ID,
    references: { model: AgentInviteCode, key: AgentInviteCode.ID },
  })
  gotInviteId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Notification.AGREEMENT_UPDATED_ID,
    // references: { model: Agreement, key: Agreement.ID },
  })
  agreementUpdatedId!: number;
}
