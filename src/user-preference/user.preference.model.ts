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
export class UserPreference extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    unique: true,
  })
  userId: number;

  @Column
  state: string;

  @Column
  city: string;

  @Column
  minTimeAmount: number;

  @Column
  maxTimeAmount: number;

  @Column
  minCost: number;

  @Column
  maxCost: number;

  @Column
  clientType: string;

  @Column
  houseType: string;

  @BelongsTo(() => User)
  user: User;
}
