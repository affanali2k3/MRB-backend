import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

// Define a Sequelize model for the "message" table
@Table({
    tableName: Message.MESSAGE_TABLE_NAME // Set the table name to "chat"
})
export class Message extends Model {
    public static MESSAGE_TABLE_NAME = 'chat' as string; // Define the table name as a static property
    public static MESSAGE_ID = 'message_id' as string; // Define the column name for the message ID
    public static SENDER_EMAIL = 'sender_email' as string; // Define the column name for the sender's email
    public static RECEIVER_EMAIL = 'receiver_email' as string; // Define the column name for the receiver's email
    public static MESSAGE = 'message' as string; // Define the column name for the message content

    // Define columns for message details
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        field: Message.MESSAGE_ID, // Set the field name in the database to message_id
    })
    message_id!: number;

    @Column({
        type: DataType.STRING,
        field: Message.SENDER_EMAIL, // Set the field name in the database to sender_email
    })
    senderEmail!: string;

    @Column({
        type: DataType.STRING,
        field: Message.RECEIVER_EMAIL, // Set the field name in the database to receiver_email
    })
    receiverEmail!: string;

    @Column({
        type: DataType.TEXT,
        field: Message.MESSAGE, // Set the field name in the database to message
    })
    message!: string;
}
