import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";


@Table({
    tableName: User.TABLE_NAME
})

export class User extends Model {
    public static TABLE_NAME = "users" as string;
    public static ID = "user_id" as string;
    public static EMAIL = "user_email" as string;
    public static USER_NAME = "user_name" as string;
    public static LICENCE = "user_licence" as string;
    public static PHOTO = "user_photo" as string;
    public static PHONE = "user_phone" as string;
    public static OCCUPATION = "user_occupation" as string;
    public static GENDER = "user_gender" as string;
    public static ADDRESS = "user_address" as string;
    public static LICENCE_STATE = "user_licence_state" as string;
    public static LICENCE_NUMBER = "user_licence_number" as string;
    public static YEAR_LICENCED = "user_year_licenced" as string;
    public static COMPLETED_DEALS = "user_completed_deals" as string;
    public static PREVIOUS_DEALS = "user_previous_deals" as string;



    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User.ID
    })
    id!: number;


    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        field: User.EMAIL
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_NAME
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        field: User.LICENCE
    })
    licence!: string;

    @Column({
        type: DataType.STRING,
        field: User.LICENCE_NUMBER
    })
    licenceNumber!: string;

    @Column({
        type: DataType.STRING,
        field: User.LICENCE_STATE
    })
    licenceState!: string;

    @Column({
        type: DataType.INTEGER,
        field: User.YEAR_LICENCED
    })
    yearLicenced!: number;

    @Column({
        type: DataType.STRING,
        field: User.ADDRESS
    })
    address!: string;

    @Column({
        type: DataType.INTEGER,
        field: User.COMPLETED_DEALS
    })
    completedDeals!: number;

    @Column({
        type: DataType.STRING,
        field: User.PHOTO
    })
    photo!: string;

    @Column({
        type: DataType.STRING,
        field: User.PHONE
    })
    phone!: string;

    @Column({
        type: DataType.STRING,
        field: User.OCCUPATION
    })
    occupation!: string;

    @Column({
        type: DataType.STRING,
        field: User.GENDER
    })
    gender!: string;
}
