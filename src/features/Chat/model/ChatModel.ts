import { Model, Table, Column, DataType } from "sequelize-typescript";

// Define a Sequelize model for the "chat" table
@Table({
    tableName: Chat.CHAT_TABLE_NAME // Set the table name to "chat"
})
export class Chat extends Model {
    public static CHAT_TABLE_NAME = "chat" as string; // Define the table name as a static property
    public static USER1_ID = "user1_id" as string; // Define the column name for user1's Id
    public static USER2_ID = "user2_id" as string; // Define the column name for user2's Id

    // Define columns for user1's email and user2's email
    @Column({
        type: DataType.INTEGER,
        field: Chat.USER1_ID, // Set the field name in the database to user1's email
        primaryKey: true, // Mark this column as a primary key
    })
    user1Id!: number;

    @Column({
        type: DataType.INTEGER,
        field: Chat.USER1_ID, // Set the field name in the database to user2's email
        primaryKey: true, // Mark this column as a primary key
    })
    user2Id!: number;
}
