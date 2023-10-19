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

@Table({
  tableName: LeadPostedNotification.TABLE_NAME,
})
export class LeadPostedNotification extends Model {
  public static TABLE_NAME = "lead_posted_notifications" as string;

  public static ID = "lead_posted_notifications_id" as string;
  public static USER_ID = "lead_posted_notifications_user_id" as string;
  public static TYPE = "lead_posted_notifications_type" as string;
  public static IMAGE = "lead_posted_notifications_image" as string;
  public static LEAD_ID = "lead_posted_notifications_lead_id" as string;
  public static IS_READ = "lead_posted_notifications_is_read" as string;

  @Column({
    type: DataType.INTEGER,
    field: LeadPostedNotification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: LeadPostedNotification.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    field: LeadPostedNotification.LEAD_ID,
    references: { model: SenderAgentOpenForm, key: SenderAgentOpenForm.ID },
    allowNull: false,
  })
  leadId!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: LeadPostedNotification.IS_READ,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @Column({
    type: DataType.STRING,
    field: LeadPostedNotification.TYPE,
    allowNull: false,
    defaultValue: "LEAD_POSTED_IN_YOUR_AREA",
  })
  type!: string;

  @Column({
    type: DataType.STRING,
    field: LeadPostedNotification.IMAGE,
    defaultValue: "",
  })
  image!: string;
}
