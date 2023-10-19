import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
  tableName: Notification.TABLE_NAME,
})
export class Notification extends Model {
  public static TABLE_NAME = "notifications" as string;

  public static ID = "notification_id" as string;
  public static USER_ID = "notification_user_id" as string;
  public static TYPE = "notification_type" as string;
  public static TEXT = "notification_text" as string;
  public static IMAGE = "notification_image" as string;

  @Column({
    type: DataType.INTEGER,
    field: Notification.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    field: Notification.TEXT,
    allowNull: false,
  })
  text!: string;

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
    type: DataType.STRING,
    field: Notification.IMAGE,
  })
  image!: string;
}
