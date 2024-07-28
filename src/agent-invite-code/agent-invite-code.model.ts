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
export class AgentInviteCode extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  code: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @Column
  inviteeEmail: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isUsed: boolean;

  @BelongsTo(() => User)
  user: User;
}
