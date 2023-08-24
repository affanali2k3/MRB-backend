import { Model, Table, Column, DataType } from "sequelize-typescript";
import { User } from "../../UserProfile/model/User";

@Table({
    tableName: AgentAnalytic.TABLE_NAME
})
export class AgentAnalytic extends Model {
    public static TABLE_NAME = "agent_analytics" as string;
    public static ID = "agent_analytic_id" as string;
    public static REFERRALS_SENT = "agent_analytic_referrals_sent" as string;
    public static REFERRALS_RECEIVED = "agent_analytic_referrals_received" as string;
    public static AGENT_TO_AGENT_RATING_SCORE = "agent_analytic_agent_to_agent_rating_score" as string;
    public static CLIENT_TO_AGENT_RATING_SCORE = "agent_analytic_client_to_agent_rating_score" as string;
    public static AGENT_TO_AGENT_RATING_NUMBER = "agent_analytic_agent_to_agent_rating_number" as string;
    public static CLIENT_TO_AGENT_RATING_NUMBER = "agent_analytic_client_to_agent_rating_number" as string;
    public static USER_ID = "agent_analytic_user_id" as string;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.ID,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.REFERRALS_SENT,
        allowNull: false,
    })
    referralsSent!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.REFERRALS_RECEIVED,
        allowNull: false,
    })
    referralsReceived!: number;

    @Column({
        type: DataType.FLOAT,
        field: AgentAnalytic.AGENT_TO_AGENT_RATING_SCORE,
        allowNull: false,
    })
    agentToAgentRatingScore!: number;

    @Column({
        type: DataType.FLOAT,
        field: AgentAnalytic.CLIENT_TO_AGENT_RATING_SCORE,
        allowNull: false,
    })
    clientToAgentRatingScore!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.AGENT_TO_AGENT_RATING_NUMBER,
        allowNull: false,
    })
    agentToAgentRatingNumber!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.CLIENT_TO_AGENT_RATING_NUMBER,
        allowNull: false,
    })
    clientToAgentRatingNumber!: number;

    @Column({
        type: DataType.INTEGER,
        field: AgentAnalytic.USER_ID,
        unique: true,
        references: { model: User.TABLE_NAME, key: User.ID },
    })
    userId!: number;
}
