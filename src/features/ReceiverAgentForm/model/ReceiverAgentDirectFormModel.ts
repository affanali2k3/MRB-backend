import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { SenderAgentDirectForm } from "../../SenderAgentForm/model/SenderAgentDirectForm";

@Table({
  tableName: ReceiverAgentDirectForm.TABLE_NAME,
})
export class ReceiverAgentDirectForm extends Model {
  public static TABLE_NAME = "receiver_agent_direct_forms" as string;
  public static ID = "receiver_agent_direct_form_id" as string;
  // The email of the agent who will receive this lead
  public static RECEIVER_AGENT =
    "receiver_agent_direct_form_receiver_agent" as string;
  // The sender form this receiver form is linked to
  public static SENDER_AGENT_DIRECT_FORM_ID =
    "sender_agent_direct_form_id" as string;
  // Specifying why you are good for this job
  public static PROPOSAL = "receiver_agent_direct_form_proposal" as string;
  public static CONSIDERING_STATUS =
    "receiver_agent_direct_form_considering_status" as string;
  public static STATUS = "receiver_agent_direct_form_status" as string;

  @Column({
    type: DataType.INTEGER,
    field: ReceiverAgentDirectForm.ID,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  // Foreign key in user table. Meaning the agent who is referring should be a registered user
  @Column({
    type: DataType.INTEGER,
    field: ReceiverAgentDirectForm.RECEIVER_AGENT,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  receiverAgent!: number;

  // Foreign key in sender agent table.
  @Column({
    type: DataType.INTEGER,
    field: ReceiverAgentDirectForm.SENDER_AGENT_DIRECT_FORM_ID,
    references: {
      model: SenderAgentDirectForm.TABLE_NAME,
      key: SenderAgentDirectForm.ID,
    },
    allowNull: false,
  })
  senderAgentFormId!: number;

  @Column({
    type: DataType.TEXT,
    field: ReceiverAgentDirectForm.PROPOSAL,
    allowNull: false,
  })
  proposal!: string;

  @Column({
    type: DataType.STRING,
    field: ReceiverAgentDirectForm.STATUS,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    field: ReceiverAgentDirectForm.CONSIDERING_STATUS,
  })
  consideringStatus!: string;
}
