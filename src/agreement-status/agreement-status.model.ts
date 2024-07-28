import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Agreement } from 'src/agreement/agreement.model';

@Table
export class AgreementStatus extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Agreement)
  @Column({
    allowNull: false,
  })
  agreementId: number;

  @BelongsTo(() => Agreement)
  agreement: Agreement;

  @Column({
    allowNull: false,
  })
  topic: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
