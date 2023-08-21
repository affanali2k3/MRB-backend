import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";

@Table({
    tableName: ReceiverAgentOpenForm.TABLE_NAME
})

export class ReceiverAgentOpenForm extends Model {
    public static TABLE_NAME = 'receiver_agent_open_forms' as string
    public static ID = 'receiver_agent_open_form_id' as string
    // The email of the agent who will receive this lead
    public static RECEIVER_AGENT = 'receiver_agent_open_form_receiver_agent' as string
    // The sender form this receiver form is linked to
    public static SENDER_AGENT_FORM_ID = 'sender_agent_open_form_id' as string
    // Specifying why you are good for this job
    public static PROPOSAL = 'receiver_agent_open_form_proposal' as string

    @Column({
        type: DataType.INTEGER,
        field: ReceiverAgentOpenForm.ID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    // Foreign key in user table. Meaning the agent who is referring should be a registered user
    @Column({
        type: DataType.TEXT,
        field: ReceiverAgentOpenForm.RECEIVER_AGENT,
        references: { model: User.TABLE_NAME, key: User.EMAIL },
        allowNull: false
    })
    receiverAgent!: string

    // Foreign key in sender agent table.
    @Column({
        type: DataType.INTEGER,
        field: ReceiverAgentOpenForm.SENDER_AGENT_FORM_ID,
        references: { model: SenderAgentOpenForm.TABLE_NAME, key: SenderAgentOpenForm.ID },
        allowNull: false
    })
    senderAgentFormId!: number

    @Column({
        type: DataType.TEXT,
        field: ReceiverAgentOpenForm.PROPOSAL,
        allowNull: false
    })
    proposal!: string

}
