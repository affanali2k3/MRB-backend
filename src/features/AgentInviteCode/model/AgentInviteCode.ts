import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
  tableName: AgentInviteCode.TABLE_NAME,
})
export class AgentInviteCode extends Model {
  public static TABLE_NAME = "agent_invite_codes" as string;
  public static ID = "id" as string;
  public static CODE = "code" as string;

  // Email of the person who is going to send the invite
  public static USER_EMAIL = "user_email" as string;

  // The email of the person who is off-platform and is invited to the platform
  public static INVITEE_EMAIL = "invitee_email" as string;
  public static IS_USED = "is_used" as string;

  @Column({
    type: DataType.INTEGER,
    field: AgentInviteCode.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.TEXT,
    field: AgentInviteCode.CODE,
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    field: AgentInviteCode.USER_EMAIL,
    allowNull: false,
    references: { model: User.TABLE_NAME, key: User.EMAIL },
  })
  userEmail!: string;

  @Column({
    type: DataType.STRING,
    field: AgentInviteCode.INVITEE_EMAIL,
  })
  sharedEmail!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: AgentInviteCode.IS_USED,
    defaultValue: false,
  })
  isUsed!: boolean;
}
