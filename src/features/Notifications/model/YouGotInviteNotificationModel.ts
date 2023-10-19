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
import { AgentInviteCode } from "../../AgentInviteCode/model/AgentInviteCode";

@Table({
  tableName: YouGotInviteNotification.TABLE_NAME,
})
export class YouGotInviteNotification extends Model {
  public static TABLE_NAME = "you_got_invite_notifications" as string;

  public static ID = "you_got_invite_notification_id" as string;
  public static USER_ID = "you_got_invite_notification_user_id" as string;
  public static TYPE = "you_got_invite_notification_type" as string;
  public static IMAGE = "you_got_invite_notification_image" as string;
  public static INVITE_ID = "you_got_invite_notification_invite_id" as string;
  public static IS_READ = "you_got_invite_notification_is_read" as string;

  @Column({
    type: DataType.INTEGER,
    field: YouGotInviteNotification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: YouGotInviteNotification.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    field: YouGotInviteNotification.INVITE_ID,
    references: { model: AgentInviteCode, key: AgentInviteCode.ID },
    allowNull: false,
  })
  inviteId!: number;

  @Column({
    type: DataType.STRING,
    field: YouGotInviteNotification.TYPE,
    allowNull: false,
    defaultValue: "SENT_YOU_A_FRIEND_REQUEST",
  })
  type!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: YouGotInviteNotification.IS_READ,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @Column({
    type: DataType.STRING,
    field: YouGotInviteNotification.IMAGE,
    defaultValue: "",
  })
  image!: string;
}
