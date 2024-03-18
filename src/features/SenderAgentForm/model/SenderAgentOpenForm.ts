import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { Col } from "sequelize/types/utils";

// Interface defining how the incoming data for this model should be like (especially their datatypes)

@Table({
  tableName: SenderAgentOpenForm.TABLE_NAME,
})
export class SenderAgentOpenForm extends Model {
  public static TABLE_NAME = "sender_agent_open_forms" as string;
  public static ID = "id" as string;
  // The email of agent who has publicily posted the lead
  public static SENDER_AGENT = "sender_agent" as string;
  // Specify if the lead is a buyer or seller
  public static IS_BUYER = "client_is_buyer" as string;
  // Lead address
  public static CITY = "client_city" as string;
  public static STATE = "client_state" as string;
  public static PROVIDENCE = "client_providence" as string;
  // When is the lead looking to purchase or sell a home
  public static TIME_AMOUNT = "client_time_amount" as string;
  public static TIME_UNIT = "client_time_unit" as string;

  public static DETAILS = "details" as string;
  public static TYPE_OF_HOUSE = "type_of_house" as string;

  // The approximate price of the home
  public static PRICE = "price" as string;

  @Column({
    type: DataType.INTEGER,
    field: SenderAgentOpenForm.ID,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: SenderAgentOpenForm.TIME_AMOUNT,
    allowNull: false,
  })
  timeAmount!: number | null;

  // Foreign key in user table. Meaning the agent who is referring should be a registered user
  @Column({
    type: DataType.INTEGER,
    field: SenderAgentOpenForm.SENDER_AGENT,
    references: { model: User.TABLE_NAME, key: User.ID },
    allowNull: false,
  })
  senderAgent!: number;

  @Column({
    type: DataType.TEXT,
    field: SenderAgentOpenForm.DETAILS,
  })
  details!: string | null;

  @Column({
    type: DataType.STRING,
    field: SenderAgentOpenForm.TYPE_OF_HOUSE,
    allowNull: false,
  })
  typeOfHouse!: string | null;

  @Column({
    type: DataType.BOOLEAN,
    field: SenderAgentOpenForm.IS_BUYER,
    allowNull: false,
  })
  isBuyer!: boolean;

  @Column({
    type: DataType.STRING,
    field: SenderAgentOpenForm.CITY,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    field: SenderAgentOpenForm.STATE,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    field: SenderAgentOpenForm.PROVIDENCE,
  })
  providence!: string;

  // Only this value can be null

  @Column({
    type: DataType.DOUBLE,
    field: SenderAgentOpenForm.PRICE,
    allowNull: false,
  })
  price!: number;
}
