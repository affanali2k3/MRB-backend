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
  tableName: SentFriendRequestNotification.TABLE_NAME,
})
export class SentFriendRequestNotification extends Model {
  public static TABLE_NAME = "sent_friend_request_notifications" as string;

  public static ID = "sent_friend_request_notification_id" as string;
  public static USER_ID = "sent_friend_request_notification_user_id" as string;
  public static TYPE = "sent_friend_request_notification_type" as string;
  public static IMAGE = "sent_friend_request_notification_image" as string;
  public static SENDER_ID =
    "sent_friend_request_notification_sender_id" as string;
  public static IS_READ = "sent_friend_request_notification_is_read" as string;

  @Column({
    type: DataType.INTEGER,
    field: SentFriendRequestNotification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: SentFriendRequestNotification.USER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    field: SentFriendRequestNotification.SENDER_ID,
    references: { model: User, key: User.ID },
    allowNull: false,
  })
  senderId!: number;

  @Column({
    type: DataType.STRING,
    field: SentFriendRequestNotification.TYPE,
    allowNull: false,
    defaultValue: "SENT_YOU_A_FRIEND_REQUEST",
  })
  type!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: SentFriendRequestNotification.IS_READ,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @Column({
    type: DataType.STRING,
    field: SentFriendRequestNotification.IMAGE,
    defaultValue: "",
  })
  image!: string;
}
