import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: LeadsModel.LEADS_TABLE_NAME
})
export class LeadsModel extends Model {
    // Define the table name for the LeadsModel
    public static LEADS_TABLE_NAME = "leads" as string;

    // Define the column names for various attributes
    public static LEAD_ID = "lead_id" as string;
    public static LEAD_TYPE = "lead_type" as string;
    public static HOUSE_TYPE = "house_type" as string;
    public static LEAD_DETAILS = "lead_details" as string;
    public static LEAD_BUDGET = "lead_budget" as string;
    public static LEAD_TIMELINE = "lead_timeline" as string;
    public static LEAD_NAME = "lead_name" as string;
    public static LEAD_PRICE = "lead_price" as string;
    public static LEAD_STATE = "lead_state" as string;
    public static LEAD_CITY = "lead_city" as string;
    public static LEAD_COUNTRY = "lead_country" as string;

    // Define a column for the primary key (auto-incremented)
    @Column({
        type: DataType.INTEGER,
        field: LeadsModel.LEAD_ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    // Define a column for the lead's type (buyer or seller)
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_TYPE,
        allowNull: false,
    })
    type!: string;

    // Define a column for the type of house the lead is interested in
    @Column({
        type: DataType.STRING,
        field: LeadsModel.HOUSE_TYPE,
        allowNull: false,
    })
    houseType!: string;

    // Define a column for the details about the lead
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_DETAILS,
        allowNull: false,
    })
    details!: string;

    // Define a column for the lead's budget
    @Column({
        type: DataType.INTEGER,
        field: LeadsModel.LEAD_BUDGET,
        allowNull: false,
    })
    budget!: number;

    // Define a column for the lead's timeline
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_TIMELINE,
        allowNull: false,
    })
    timeline!: string;

    // Define a column for the lead's name
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_NAME,
        allowNull: false,
    })
    name!: string;

    // Define a column for the lead's price
    @Column({
        type: DataType.INTEGER,
        field: LeadsModel.LEAD_PRICE,
        allowNull: false,
    })
    price!: number;

    // Define a column for the lead's state
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_STATE,
        allowNull: false,
    })
    state!: string;

    // Define a column for the lead's city
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_CITY,
        allowNull: false,
    })
    city!: string;

    // Define a column for the lead's country
    @Column({
        type: DataType.STRING,
        field: LeadsModel.LEAD_COUNTRY,
        allowNull: false,
    })
    country!: string;
}