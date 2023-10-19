import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { SenderAgentDirectForm } from "../../SenderAgentForm/model/SenderAgentDirectForm";

@Table({
  tableName: SentYouLeadNotification.TABLE_NAME,
})
export class SentYouLeadNotification extends Model {
  public static TABLE_NAME = "sent_you_lead_notifications" as string;

  public static ID = "sent_you_lead_notification_id" as string;
  public static USER_ID = "sent_you_lead_notification_user_id" as string;
  public static TYPE = "sent_you_lead_notification_type" as string;
  public static IMAGE = "sent_you_lead_notification_image" as string;
  public static LEAD_ID = "sent_you_lead_notification_lead_id" as string;
  public static IS_READ = "sent_you_lead_notification_is_read" as string;

  @Column({
    type: DataType.INTEGER,
    field: SentYouLeadNotification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: SentYouLeadNotification.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    field: SentYouLeadNotification.LEAD_ID,
    references: { model: SenderAgentDirectForm, key: SenderAgentDirectForm.ID },
    allowNull: false,
  })
  leadId!: number;

  @Column({
    type: DataType.STRING,
    field: SentYouLeadNotification.TYPE,
    allowNull: false,
    defaultValue: "SENT_YOU_A_LEAD",
  })
  type!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: SentYouLeadNotification.IS_READ,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @Column({
    type: DataType.STRING,
    field: SentYouLeadNotification.IMAGE,
    defaultValue: "",
  })
  image!: string;
}
