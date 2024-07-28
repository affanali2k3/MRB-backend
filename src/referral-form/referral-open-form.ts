import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class ReferralOpenForm extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  timeAmount: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  senderAgentId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  details: string;

  @Column
  typeOfHouse: string;

  @Column({
    allowNull: false,
  })
  isBuyer: boolean;

  @Column({
    allowNull: false,
  })
  city: string;

  @Column({
    allowNull: false,
  })
  state: string;

  @Column
  providence: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;
}
