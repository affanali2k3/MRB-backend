import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
  tableName: SenderAgentDirectForm.TABLE_NAME,
})
export class SenderAgentDirectForm extends Model {
  public static TABLE_NAME = "sender_agent_direct_forms" as string;
  public static ID = "id" as string;
  // The email of the agent who has sent the lead
  public static SENDER_AGENT = "sender_agent" as string;
  // The email of the agent who will receive this lead
  public static RECEIVER_AGENT = "receiver_agent" as string;
  // Specify if the lead is a buyer or seller
  public static IS_BUYER = "client_is_buyer" as string;
  // Lead address
  public static CITY = "client_city" as string;
  public static STATE = "client_state" as string;
  public static PROVIDENCE = "client_providence" as string;
  // When is the lead looking to purchase or sell a home
  public static TIME_AMOUNT = "time_amount" as string;
  public static TIME_UNIT = "time_unit" as string;

  // The approximate price of the home
  public static PRICE = "price" as string;

  public static DETAILS = "details" as string;
  public static TYPE_OF_HOUSE = "type_of_house" as string;

  @Column({
    type: DataType.INTEGER,
    field: SenderAgentDirectForm.ID,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  // Foreign key in user table. Meaning the agent who is referring should be a registered user
  @Column({
    type: DataType.INTEGER,
    field: SenderAgentDirectForm.SENDER_AGENT,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  senderAgent!: number;

  // Foreign key in user table. Meaning the agent who is referred to should be a registered user
  @Column({
    type: DataType.INTEGER,
    field: SenderAgentDirectForm.RECEIVER_AGENT,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  receiverAgent!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: SenderAgentDirectForm.IS_BUYER,
    allowNull: false,
  })
  isBuyer!: boolean;

  @Column({
    type: DataType.STRING,
    field: SenderAgentDirectForm.CITY,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    field: SenderAgentDirectForm.STATE,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    field: SenderAgentDirectForm.PROVIDENCE,
    allowNull: false,
  })
  providence!: string;

  // Only this value can be null
  @Column({
    type: DataType.INTEGER,
    field: SenderAgentDirectForm.TIME_AMOUNT,
    allowNull: false,
  })
  timeAmount!: number | null;

  @Column({
    type: DataType.TEXT,
    field: SenderAgentDirectForm.DETAILS,
  })
  details!: string | null;

  @Column({
    type: DataType.STRING,
    field: SenderAgentDirectForm.TYPE_OF_HOUSE,
    allowNull: false,
  })
  typeOfHouse!: string | null;

  @Column({
    type: DataType.INTEGER,
    field: SenderAgentDirectForm.PRICE,
    allowNull: false,
  })
  price!: number;
}
