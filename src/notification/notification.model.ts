import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AgentInviteCode } from 'src/agent-invite-code/agent-invite-code.model';
import { Agreement } from 'src/agreement/agreement.model';
import { ReferralDirectForm } from 'src/referral-form/referral-direct-form';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { UserAssociates } from 'src/user-associate/user-associate.model';
import { User } from 'src/user/user.model';

@Table
export class Notification extends Model {
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

  @Column({
    allowNull: false,
  })
  type: string;

  @Column
  text: string;

  @ForeignKey(() => ReferralOpenForm)
  @Column
  referralPostedId: number;

  @ForeignKey(() => ReferralDirectForm)
  @Column
  referralReceivedId: number;

  @ForeignKey(() => UserAssociates)
  @Column
  assocationRequestId: number;

  @ForeignKey(() => AgentInviteCode)
  @Column
  gotInviteId: number;

  @ForeignKey(() => Agreement)
  @Column
  agreementUpdatedId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => ReferralOpenForm)
  referralPosted: ReferralOpenForm;

  @BelongsTo(() => ReferralDirectForm)
  referralReceived: ReferralDirectForm;

  @BelongsTo(() => UserAssociates)
  assocationRequest: UserAssociates;

  @BelongsTo(() => AgentInviteCode)
  gotInvite: AgentInviteCode;

  @BelongsTo(() => Agreement)
  agreement: Agreement;
}
