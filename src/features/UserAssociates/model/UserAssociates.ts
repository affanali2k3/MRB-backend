import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    indexes: [
        {
            name: UserAssociates.UNIQUE_CONSTRAINT_ASSOCIATION,
            unique: true,
            fields: [UserAssociates.USER_ID, UserAssociates.ASSOCIATE_ID]
        }
    ],
    tableName: UserAssociates.TABLE_NAME
})

export class UserAssociates extends Model {
    public static TABLE_NAME = "user_associates" as string;
    public static ID = "association_id" as string;
    public static USER_ID = "user_id" as string;
    public static ASSOCIATE_ID = "associate_id" as string;
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
        type: DataType.INTEGER,
        field: UserAssociates.USER_ID,
        allowNull: false,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    userId!: number;

    @Column({
        type: DataType.INTEGER,
        field: UserAssociates.ASSOCIATE_ID,
        allowNull: false,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    associateId!: number;

    @Column({
        type: DataType.STRING,
        field: UserAssociates.ASSOCIATION_STATUS,
        allowNull: false
    })
    status!: string;
}

export default UserAssociates;