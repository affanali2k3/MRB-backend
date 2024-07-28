import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Message extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  messageId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  senderId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  receiverId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @BelongsTo(() => User)
  sender: User;

  @BelongsTo(() => User)
  receiver: User;
}
