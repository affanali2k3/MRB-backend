<<<<<<< HEAD
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
=======
import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

// Define a Sequelize model for the "chat" table
@Table({
    indexes: [{
        unique: true,
        fields: [Chat.USER_ONE_ID, Chat.USER_TWO_ID]
    }],
    tableName: Chat.TABLE_NAME // Set the table name to "chat"
})
export class Chat extends Model {
    public static TABLE_NAME = "chats" as string; // Define the table name as a static property
    public static ID = "chat_id" as string; // Define the column name for user1's email
    public static USER_ONE_ID = "chat_user_one_id" as string; // Define the column name for user1's email
    public static USER_TWO_ID = "chat_user_two_id" as string; // Define the column name for user2's email
    public static LAST_MESSAGE = "chat_last_message" as string; // Define the column name for user2's email
    public static IS_READ = "chat_is_read" as string; // Define the column name for user2's email
    public static NUMBER_OF_UNREAD_MESSAGES = "chat_number_of_unread_messages" as string; // Define the column name for user2's email

    // Define columns for user1's email and user2's email
    @Column({
        type: DataType.INTEGER,
        field: Chat.ID, // Set the field name in the database to user1's email
        autoIncrement: true,
        primaryKey: true, // Mark this column as a primary key
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        field: Chat.USER_ONE_ID, // Set the field name in the database to user1's email
        references: {model: User, key: User.ID},
        allowNull: false,
    })
    userOneId!: number;

    @Column({
        type: DataType.INTEGER,
        field: Chat.USER_TWO_ID, // Set the field name in the database to user2's email
        allowNull: false,

    })
    userTwoId!: number;

    @Column({
        type: DataType.STRING,
        field: Chat.LAST_MESSAGE, // Set the field name in the database to user2's email
        allowNull: false,

    })
    lastMessage!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: Chat.IS_READ, // Set the field name in the database to user2's email
        allowNull: false,

    })
    isRead!: boolean;

    @Column({
        type: DataType.INTEGER,
        field: Chat.NUMBER_OF_UNREAD_MESSAGES, // Set the field name in the database to user2's email
        allowNull: false,

    })
    numberOfUnreadMessages!: number;
}
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
