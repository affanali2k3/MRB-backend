import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { User } from 'src/user/user.model';

@Table({
  indexes: [
    {
      name: 'receiver_agent_unique_constraint',
      unique: true,
      fields: [
        ProposalOpenForm.RECEIVER_AGENT_ID,
        ProposalOpenForm.SENDER_AGENT_FORM_ID,
      ],
    },
  ],
})
export class ProposalOpenForm extends Model {
  public static RECEIVER_AGENT_ID = 'receiverAgentId' as string;
  public static SENDER_AGENT_FORM_ID = 'senderAgentFormId' as string;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: ProposalOpenForm.RECEIVER_AGENT_ID,
  })
  receiverAgentId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => ReferralOpenForm)
  @Column({
    allowNull: false,
    field: ProposalOpenForm.SENDER_AGENT_FORM_ID,
  })
  senderAgentFormId: number;

  @BelongsTo(() => ReferralOpenForm)
  referralForm: ReferralOpenForm;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  proposal: string;

  @Column({
    allowNull: false,
  })
  status: string;
}
