import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";
import { Agreement } from "../../Agreement/model/AgreementModel";

@Table({
  tableName: AgreementStatus.TABLE_NAME,
})
export class AgreementStatus extends Model {
  public static TABLE_NAME = "agreements_status" as string;
  public static ID = "id" as string;
  public static AGREEMENT_ID = "agreement_id" as string;
  public static STATUS = "status" as string;

  @Column({
    type: DataType.INTEGER,
    field: AgreementStatus.ID,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: AgreementStatus.AGREEMENT_ID,
    references: { model: Agreement.TABLE_NAME, key: Agreement.ID },
    allowNull: false,
  })
  agreementId!: number;

  @Column({
    type: DataType.TEXT,
    field: AgreementStatus.STATUS,
    allowNull: false,
  })
  status!: string;
}
