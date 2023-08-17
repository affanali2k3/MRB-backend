import { Model, Table, Column, DataType, } from "sequelize-typescript";


@Table({
    tableName: Chat.CHAT_TABLE_NAME
})

export class Chat extends Model {
    public static CHAT_TABLE_NAME = "chat" as string;
    public static USER1_EMAIL = "user1_email" as string;
    public static USER2_EMAIL = "user2_email" as string;


    @Column({
        type: DataType.STRING,
        field: Chat.USER1_EMAIL,
        primaryKey: true,
    })
    user1Email!: string;

    @Column({
        type: DataType.STRING,
        field: Chat.USER2_EMAIL,
        primaryKey: true

    })
    user2Email!: string;
}