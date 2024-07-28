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
export class AgentInvitee extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  inviterUserId: number;

  @ForeignKey(() => User)
  @Column
  inviteeUserId: number;

  @BelongsTo(() => User)
  inviter: User;

  @BelongsTo(() => User)
  invitee: User;
}
