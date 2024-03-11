import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: User.TABLE_NAME,
})
export class User extends Model {
  public static TABLE_NAME = "users" as string;
  public static ID = "id" as string;
  public static EMAIL = "email" as string;
  public static USER_NAME = "name" as string;
  public static BIOGRAPHY = "biography" as string;
  public static TEAM_MEMBERS = "team_members" as string;
  public static PHOTO = "photo" as string;
  public static COVER_PHOTO = "cover_photo" as string;
  public static PHONE = "phone" as string;
  public static LICENSE_STATE = "license_state" as string;
  public static LICENSE_NUMBER = "license_number" as string;
  public static LICENSE_YEAR = "license_year" as string;

  @Column({
    type: DataType.INTEGER,
    field: User.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    field: User.EMAIL,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    field: User.USER_NAME,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    field: User.BIOGRAPHY,
  })
  biography!: string;

  @Column({
    type: DataType.STRING,
    field: User.LICENSE_NUMBER,
  })
  licenseNumber!: string;

  @Column({
    type: DataType.INTEGER,
    field: User.TEAM_MEMBERS,
  })
  teamMembers!: number;

  @Column({
    type: DataType.STRING,
    field: User.LICENSE_STATE,
  })
  licenceState!: string;

  @Column({
    type: DataType.INTEGER,
    field: User.LICENSE_YEAR,
  })
  licenseYear!: number;

  @Column({
    type: DataType.STRING,
    field: User.PHOTO,
  })
  photo!: string;

  @Column({
    type: DataType.STRING,
    field: User.COVER_PHOTO,
  })
  coverPhoto!: string;

  @Column({
    type: DataType.STRING,
    field: User.PHONE,
  })
  phone!: string;
}
