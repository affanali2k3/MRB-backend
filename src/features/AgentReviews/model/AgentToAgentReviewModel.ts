import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    indexes: [
        {
            name: AgentToAgentReview.UNIQUE_CONSTRAINT_REVIEWER_SUBJECT,
            unique: true,
            fields: [AgentToAgentReview.REVIEWER_ID, AgentToAgentReview.SUBJECT_ID]
        },
    ],
    tableName: AgentToAgentReview.TABLE_NAME
})
export class AgentToAgentReview extends Model {
    public static TABLE_NAME = "agent_to_agent_reviews" as string;
    public static ID = "agent_to_agent_review_id" as string;
    public static REVIEW = "agent_to_agent_review" as string;
    public static RATING = "agent_to_agent_review_rating" as string;
    public static SUBJECT_ID = "agent_to_agent_review_subject_id" as string;
    public static REVIEWER_ID = "agent_to_agent_review_reviewer_id" as string;
    public static UNIQUE_CONSTRAINT_REVIEWER_SUBJECT = "unique_constraint_reviewer_subject" as string;


    @Column({
        type: DataType.INTEGER,
        field: AgentToAgentReview.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: AgentToAgentReview.REVIEW,
    })
    review!: string;

    @Column({
        type: DataType.FLOAT,
        field: AgentToAgentReview.RATING,
        allowNull: false,
    })
    rating!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentToAgentReview.REVIEWER_ID,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    reviewerId!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentToAgentReview.SUBJECT_ID,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    subjectId!: number;
}
