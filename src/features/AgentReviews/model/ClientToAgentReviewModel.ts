import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    indexes: [
        {
            name: ClientToAgentReview.UNIQUE_CONSTRAINT_CLIENT_SUBJECT,
            unique: true,
            fields: [ClientToAgentReview.CLIENT_EMAIL, ClientToAgentReview.SUBJECT_ID]
        },
    ],
    tableName: ClientToAgentReview.TABLE_NAME
})
export class ClientToAgentReview extends Model {
    public static TABLE_NAME = "client_to_agent_reviews" as string;
    public static ID = "client_to_agent_review_id" as string;
    public static REVIEW = "client_to_agent_review" as string;
    public static RATING = "client_to_agent_review_rating" as string;
    public static SUBJECT_ID = "client_to_agent_review_subject_id" as string;
    public static CLIENT_EMAIL = "client_to_agent_review_client_email" as string;
    public static UNIQUE_CONSTRAINT_CLIENT_SUBJECT = "unique_constraint_client_subject" as string;

    @Column({
        type: DataType.INTEGER,
        field: ClientToAgentReview.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: ClientToAgentReview.REVIEW,
    })
    review!: string;

    @Column({
        type: DataType.FLOAT,
        field: ClientToAgentReview.RATING,
        allowNull: false,
    })
    rating!: number;

    @Column({
        type: DataType.STRING,
        field: ClientToAgentReview.CLIENT_EMAIL,
    })
    clientEmail!: string;

    @Column({
        type: DataType.INTEGER,
        field: ClientToAgentReview.SUBJECT_ID,
        unique: true,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    subjectId!: number;
}
