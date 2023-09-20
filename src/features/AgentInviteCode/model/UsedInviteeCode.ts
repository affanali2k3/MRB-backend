import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Unique, Index } from "sequelize-typescript"; // Import necessary modules
import { User } from "../../UserProfile/model/User";

@Table({
    tableName: UsedInviteeCode.TABLE_NAME // Set the table name for the Like model
})
export class UsedInviteeCode extends Model {
    public static TABLE_NAME = "agent_invite_used_codes" as string; // Define the table name constant for the Like model
    public static ID = "agent_invite_used_code_id" as string; // Define the column name constant for the ID field
    public static CODE = "agent_invite_used_code" as string; // Define the column name constant for the POST_ID field
    public static USER_EMAIL = "agent_invite_used_code_user_email" as string; // Define the column name constant for the USER_EMAIL field
    public static SHARED_EMAIL = "agent_invite_used_code_shared_email" as string; // Define the column name constant for the USER_EMAIL field

    @Column({
        type: DataType.INTEGER,
        field: UsedInviteeCode.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number; // Define the ID field with auto-incrementing primary key

    @Column({
        type: DataType.TEXT,
        field: UsedInviteeCode.CODE,
        allowNull: false,
    })
    code!: string; // Define the POST_ID field with a foreign key reference to the 'posts' table

    @Column({
        type: DataType.STRING,
        field: UsedInviteeCode.USER_EMAIL,
        allowNull: false,
        references: { model: User.TABLE_NAME, key: User.EMAIL },
    })
    userEmail!: string; // Define the USER_EMAIL field with a foreign key reference to the 'users' table

    @Column({
        type: DataType.STRING,
        field: UsedInviteeCode.SHARED_EMAIL,
    })
    sharedEmail!: string; // Define the USER_EMAIL field with a foreign key reference to the 'users' table
}
