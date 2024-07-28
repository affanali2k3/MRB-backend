import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({
  indexes: [
    {
      name: 'unique_constraint_association',
      unique: true,
      fields: ['userId', 'associateId'],
    },
  ],
})
export class UserAssociates extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  associateId: number;

  @Column({
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => User)
  associate: User;
}
