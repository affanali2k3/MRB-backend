import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
  Index,
} from "sequelize-typescript"; // Import necessary modules
import { User } from "../../UserProfile/model/User";

@Table({
  tableName: AgentInvitee.TABLE_NAME, // Set the table name for the Like model
})
export class AgentInvitee extends Model {
  public static TABLE_NAME = "agent_invitees" as string; // Define the table name constant for the Like model
  public static ID = "agent_invitee_id" as string; // Define the column name constant for the ID field
  public static INVITER_USER_EMAIL =
    "agent_invitee_inviter_user_email" as string; // Define the column name constant for the ID field
  public static INVITEE_USER_EMAIL =
    "agent_invitee_invitee_user_email" as string; // Define the column name constant for the POST_ID field

  @Column({
    type: DataType.INTEGER,
    field: AgentInvitee.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number; // Define the ID field with auto-incrementing primary key

  @Column({
    type: DataType.STRING,
    field: AgentInvitee.INVITER_USER_EMAIL,
    allowNull: false,
    references: { model: User.TABLE_NAME, key: User.EMAIL },
  })
  inviterUserEmail!: string; // Define the USER_EMAIL field with a foreign key reference to the 'users' table

  @Column({
    type: DataType.STRING,
    field: AgentInvitee.INVITEE_USER_EMAIL,
    references: { model: User.TABLE_NAME, key: User.EMAIL },
  })
  inviteeUserEmail!: string; // Define the USER_EMAIL field with a foreign key reference to the 'users' table
}
