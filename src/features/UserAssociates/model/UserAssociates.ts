import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    // Commented out index definition
    // indexes: [
    //     {
    //         name: UserAssociates.UNIQUE_CONSTRAINT_ASSOCIATION,
    //         unique: true,
    //         fields: [UserAssociates.USER_EMAIL, UserAssociates.ASSOCIATE_EMAIL]
    //     }
    // ],
    tableName: UserAssociates.TABLE_NAME
})

export class UserAssociates extends Model {
    public static TABLE_NAME = "user_associates" as string;
    public static ID = "association_id" as string;
    public static USER_EMAIL = "user_email" as string;
    public static ASSOCIATE_EMAIL = "associate_email" as string;
    public static ASSOCIATION_STATUS = "association_status" as string;
    public static UNIQUE_CONSTRAINT_ASSOCIATION = "unique_constraint_association" as string;

    @Column({
        type: DataType.INTEGER,
        field: UserAssociates.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: UserAssociates.USER_EMAIL,
        allowNull: false,
        unique: true,
        references: { model: User.TABLE_NAME, key: User.EMAIL },
    })
    userEmail!: string;

    @Column({
        type: DataType.STRING,
        field: UserAssociates.ASSOCIATE_EMAIL,
        allowNull: false,
        unique: true,
        references: { model: User.TABLE_NAME, key: User.EMAIL },
    })
    associateEmail!: string;

    @Column({
        type: DataType.STRING,
        field: UserAssociates.ASSOCIATION_STATUS,
        allowNull: false
    })
    status!: string;
}

export default UserAssociates;