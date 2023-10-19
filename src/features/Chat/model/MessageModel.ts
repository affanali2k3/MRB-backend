import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";

// Define a Sequelize model for the "message" table
@Table({
  tableName: Message.MESSAGE_TABLE_NAME, // Set the table name to "chat"
})
export class Message extends Model {
  public static MESSAGE_TABLE_NAME = "messages" as string; // Define the table name as a static property
  public static MESSAGE_ID = "message_id" as string; // Define the column name for the message ID
  public static SENDER_ID = "message_sender_id" as string; // Define the column name for the sender's email
  public static RECEIVER_ID = "message_receiver_id" as string; // Define the column name for the receiver's email
  public static MESSAGE = "message" as string; // Define the column name for the message content

  // Define columns for message details
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Message.MESSAGE_ID, // Set the field name in the database to message_id
  })
  messageId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Message.SENDER_ID, // Set the field name in the database to sender_email
  })
  senderId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Message.RECEIVER_ID, // Set the field name in the database to receiver_email
  })
  receiverId!: number;

  @Column({
    type: DataType.TEXT,
    field: Message.MESSAGE, // Set the field name in the database to message
  })
  message!: string;
}
