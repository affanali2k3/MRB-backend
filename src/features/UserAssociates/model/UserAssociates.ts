import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({
    tableName: UserAssociates.USER_ASSOCIATES_TABLE_NAME
})

export class UserAssociates extends Model {
    public static USER_ASSOCIATES_TABLE_NAME = "user_associates" as string;
    public static USER_EMAIL = "user_email" as string;
    public static ASSOCIATE_EMAIL = "associate_email" as string;
    public static ASSOCIATION_STATUS = "association_status" as string;


    @Column({
        type: DataType.STRING,
        field: UserAssociates.USER_EMAIL,
        primaryKey: true
    })
    userEmail!: string;

    @Column({
        type: DataType.STRING,
        field: UserAssociates.ASSOCIATE_EMAIL,
        primaryKey: true

    })
    associateEmail!: string;


    @Column({
        type: DataType.STRING,
        field: UserAssociates.ASSOCIATION_STATUS
    })
    status!: string;


}