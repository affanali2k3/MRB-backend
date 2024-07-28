import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ReferralDirectForm } from 'src/referral-form/referral-direct-form';
import { User } from 'src/user/user.model';

@Table
export class ProposalDirectForm extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  receiverAgentId: number;

  @ForeignKey(() => ReferralDirectForm)
  @Column({
    allowNull: false,
  })
  senderAgentFormId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  proposal: string;

  @Column({
    allowNull: false,
  })
  status: string;

  @Column
  consideringStatus: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => ReferralDirectForm)
  referralForm: ReferralDirectForm;
}
