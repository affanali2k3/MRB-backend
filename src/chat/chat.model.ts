import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({
  indexes: [
    {
      unique: true,
      fields: ['userOneId', 'userTwoId'],
    },
  ],
})
export class Chat extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userOneId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userTwoId: number;

  @Column({
    allowNull: false,
  })
  lastMessage: string;

  @Column({
    allowNull: false,
  })
  isRead: boolean;

  @Column({
    allowNull: false,
  })
  numberOfUnreadMessages: number;

  @BelongsTo(() => User)
  userOne: User;

  @BelongsTo(() => User)
  userTwo: User;
}
