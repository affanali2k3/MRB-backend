import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    tableName: UserPreferences.TABLE_NAME
})

export class UserPreferences extends Model {
    public static TABLE_NAME = "user_preferences" as string;
    public static ID = "preference_id" as string;
    public static USER_ID = "user_id" as string;
    public static STATE = "preference_state" as string;
    public static CITY = "preference_city" as string;
    public static MIN_TIME_AMOUNT  = "preference_min_time_amount" as string;
    public static MAX_TIME_AMOUNT = "preference_max_time_amount" as string;
    public static MIN_COST = "preference_min_cost" as string;
    public static MAX_COST = "preference_max_cost" as string;
    public static CLIENT_TYPE = "preference_client_type" as string;
    public static HOUSE_TYPE = "preference_house_type" as string;


    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.USER_ID,
        allowNull: false,
        unique: true,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        field: UserPreferences.STATE,
    })
    state!: string | undefined;

    @Column({
        type: DataType.STRING,
        field: UserPreferences.CITY,
    })
    city!: string | undefined;

    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.MIN_TIME_AMOUNT,
    })
    minTimeAmount!: number | undefined;

    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.MAX_TIME_AMOUNT,
    })
    maxTimeAmount!: number | undefined;

    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.MIN_COST,
    })
    minCost!: number | undefined;

    @Column({
        type: DataType.INTEGER,
        field: UserPreferences.MAX_COST,
    })
    maxCost!: number | undefined;

    @Column({
        type: DataType.STRING,
        field: UserPreferences.CLIENT_TYPE,
    })
    clientType!: string | undefined;

    @Column({
        type: DataType.STRING,
        field: UserPreferences.HOUSE_TYPE,
    })
    houseType!: string | undefined;
}

export default UserPreferences;