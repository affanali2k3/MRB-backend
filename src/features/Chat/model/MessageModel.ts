import { Model, Table, Column, DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: Message.MESSAGE_TABLE_NAME
})
export class Message extends Model {
    public static MESSAGE_TABLE_NAME = 'chat' as string;
    public static MESSAGE_ID = 'message_id' as string;
    public static SENDER_EMAIL = 'sender_email' as string;
    public static RECEIVER_EMAIL = 'receiver_email' as string;
    public static MESSAGE = 'message' as string;

    @Column({
        type: DataType.INTEGER,
        field: Message.MESSAGE_ID,
        autoIncrement: true,
        primaryKey: true
    })

    message_id!: number;

    @Column({
        type: DataType.STRING,
        field: Message.SENDER_EMAIL
    })
    senderEmail!: string;

    @Column({
        type: DataType.STRING,
        field: Message.RECEIVER_EMAIL
    })
    receiverEmail!: string;

    @Column({
        type: DataType.TEXT,
        field: Message.MESSAGE
    })
    message!: string;
}
