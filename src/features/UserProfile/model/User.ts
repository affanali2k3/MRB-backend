import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({
    tableName: User.USER_TABLE_NAME
})

export class User extends Model {
    public static USER_TABLE_NAME = "users" as string;
    public static USER_SSN = "user_ssn" as string;
    public static USER_EMAIL = "user_email" as string;
    public static USER_NAME = "user_name" as string;
    public static USER_LICENSE = "user_licence" as string;
    public static USER_PHOTO = "user_photo" as string;
    public static USER_PHONE = "user_phone" as string;
    public static USER_OCCUPATION = "user_occupation" as string;
    public static USER_GENDER = "user_gender" as string;
    public static USER_ADDRESS = "user_address" as string;
    public static USER_LICENCE_STATE = "user_licence_state" as string;
    public static USER_LICENCE_NUMBER = "user_licence_number" as string;
    public static USER_YEAR_LICENCED = "user_year_licenced" as string;
    public static USER_COMPLETED_DEALS = "user_completed_deals" as string;
    public static USER_PREVIOUS_DEALS = "user_previous_deals" as string;



    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: User.USER_EMAIL
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_SSN
    })
    ssn!: string;


    @Column({
        type: DataType.STRING,
        field: User.USER_NAME
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_LICENSE
    })
    licence!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_LICENCE_NUMBER
    })
    licenceNumber!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_LICENCE_STATE
    })
    licenceState!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_YEAR_LICENCED
    })
    yearLicenced!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_ADDRESS
    })
    address!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_COMPLETED_DEALS
    })
    completedDeals!: string;

    @Column({
        type: DataType.TEXT,
        field: User.USER_PREVIOUS_DEALS
    })
    previousDeals!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_PHOTO
    })
    photo!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_PHONE
    })
    phone!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_OCCUPATION
    })
    occupation!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_GENDER
    })
    gender!: string;
}