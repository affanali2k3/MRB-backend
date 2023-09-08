import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";


// Interface defining how the incoming data for this model should be like (especially their datatypes)


@Table({
    tableName: SenderAgentOpenForm.TABLE_NAME
})

export class SenderAgentOpenForm extends Model {
    public static TABLE_NAME = 'sender_agent_open_forms' as string
    public static ID = 'sender_agent_open_forms_id' as string
    // The email of agent who has publicily posted the lead
    public static SENDER_AGENT = 'sender_agent_open_forms_sender_agent' as string
    // Specify if the lead is a buyer or seller
    public static IS_BUYER = 'sender_agent_open_forms_is_buyer' as string
    // Lead address
    public static CITY = 'sender_agent_open_forms_city' as string
    public static STATE = 'sender_agent_open_forms_state' as string
    public static PROVIDENCE = 'sender_agent_open_forms_providence' as string
    // When is the lead looking to purchase or sell a home
    public static DESIRED_DATE = 'sender_agent_open_forms_desired_date' as string
    // The approximate price of the home
    public static PRICE = 'sender_agent_open_forms_price' as string

    @Column({
        type: DataType.INTEGER,
        field: SenderAgentOpenForm.ID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    // Foreign key in user table. Meaning the agent who is referring should be a registered user
    @Column({
        type: DataType.INTEGER,
        field: SenderAgentOpenForm.SENDER_AGENT,
        // references: { model: User.TABLE_NAME, key: User.ID },
        allowNull: false
    })
    senderAgent!: number

    @Column({
        type: DataType.BOOLEAN,
        field: SenderAgentOpenForm.IS_BUYER,
        allowNull: false
    })
    isBuyer!: boolean

    @Column({
        type: DataType.TEXT,
        field: SenderAgentOpenForm.CITY,
        allowNull: false
    })
    city!: string

    @Column({
        type: DataType.TEXT,
        field: SenderAgentOpenForm.STATE,
        allowNull: false
    })
    state!: string

    @Column({
        type: DataType.TEXT,
        field: SenderAgentOpenForm.PROVIDENCE,
        allowNull: false
    })
    providence!: string

    // Only this value can be null
    @Column({
        type: DataType.DATEONLY,
        field: SenderAgentOpenForm.DESIRED_DATE,
    })
    desiredDate!: Date | null

    @Column({
        type: DataType.INTEGER,
        field: SenderAgentOpenForm.PRICE,
    })
    price!: number

}
