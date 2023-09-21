import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    tableName: SenderAgentDirectForm.TABLE_NAME
})

export class SenderAgentDirectForm extends Model {
    public static TABLE_NAME = 'sender_agent_direct_forms' as string
    public static ID = 'sender_agent_direct_forms_id' as string
    // The email of the agent who has sent the lead
    public static SENDER_AGENT = 'sender_agent_direct_forms_sender_agent' as string
    // The email of the agent who will receive this lead
    public static RECEIVER_AGENT = 'sender_agent_direct_forms_receiver_agent' as string
    // Specify if the lead is a buyer or seller
    public static IS_BUYER = 'sender_agent_direct_forms_is_buyer' as string
    // Lead address
    public static CITY = 'sender_agent_direct_forms_city' as string
    public static STATE = 'sender_agent_direct_forms_state' as string
    public static PROVIDENCE = 'sender_agent_direct_forms_providence' as string
    // When is the lead looking to purchase or sell a home
    public static time_amount = 'sender_agent_direct_forms_time_amount' as string
    public static time_unit = 'sender_agent_direct_forms_time_unit' as string

    // The approximate price of the home
    public static PRICE = 'sender_agent_direct_forms_price' as string

    public static details = 'sender_agent_open_forms_details' as string
    public static typeOfHouse = 'sender_agent_open_forms_type_of_house' as string

    @Column({
        type: DataType.INTEGER,
        field: SenderAgentDirectForm.ID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    // Foreign key in user table. Meaning the agent who is referring should be a registered user
    @Column({
        type: DataType.INTEGER,
        field: SenderAgentDirectForm.SENDER_AGENT,
        references: { model: User.TABLE_NAME, key: User.ID },
        allowNull: false
    })
    senderAgent!: number

    // Foreign key in user table. Meaning the agent who is referred to should be a registered user
    @Column({
        type: DataType.INTEGER,
        field: SenderAgentDirectForm.RECEIVER_AGENT,
        references: { model: User.TABLE_NAME, key: User.ID },
        allowNull: false
    })
    receiverAgent!: number

    @Column({
        type: DataType.BOOLEAN,
        field: SenderAgentDirectForm.IS_BUYER,
        allowNull: false
    })
    isBuyer!: boolean

    @Column({
        type: DataType.TEXT,
        field: SenderAgentDirectForm.CITY,
        allowNull: false
    })
    city!: string

    @Column({
        type: DataType.TEXT,
        field: SenderAgentDirectForm.STATE,
        allowNull: false
    })
    state!: string

    @Column({
        type: DataType.TEXT,
        field: SenderAgentDirectForm.PROVIDENCE,
        allowNull: false
    })
    providence!: string

    // Only this value can be null
    @Column({
        type: DataType.INTEGER,
        field: SenderAgentDirectForm.time_amount,
    })
    timeAmount!: number | null

    
    @Column({
        type: DataType.TEXT,
        field: SenderAgentDirectForm.details,
    })
    details!: string | null
    @Column({
        type: DataType.TEXT,
        field: SenderAgentDirectForm.typeOfHouse,
    })
    typeOfHouse!: string | null
    @Column({
        type: DataType.STRING,
        field: SenderAgentDirectForm.time_unit,
    })
    timeUnit!: string | null



    @Column({
        type: DataType.INTEGER,
        field: SenderAgentDirectForm.PRICE,
        allowNull: false
    })
    price!: number

}
