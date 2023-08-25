import { Op, WhereOptions } from "sequelize";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { SearchData } from "../controller/ReferralCenterController";


interface IReferralCenterRepo {
    searchForLeads(data: SearchData): Promise<SenderAgentOpenForm[]>
}

class ReferralCenterRepo implements IReferralCenterRepo {
    async searchForLeads(data: SearchData): Promise<SenderAgentOpenForm[]> {
        try {
            const whereClause: any = {};
            const userWhereClause: any = {};
            const analyticWhereClause: WhereOptions<AgentAnalytic> = {};

            if (data.state !== undefined) {
                whereClause.state = data.state;
            }
            if (data.city !== undefined) {
                whereClause.city = data.city;
            }
            if (data.agentYearsOfExperience !== undefined) {
                userWhereClause.yearsOfExperience = data.agentYearsOfExperience;
            }
            // if (data.isAgentOnTeam !== undefined) {
            //     userWhereClause.isAgentOnTeam = data.isAgentOnTeam;
            // }
            if (data.rating !== undefined) {
                analyticWhereClause.agentToAgentRating = { [Op.gte]: data.rating };
            }

            const results = await SenderAgentOpenForm.findAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        where: userWhereClause,
                        include: [
                            {
                                model: AgentAnalytic,
                                where: analyticWhereClause
                            }
                        ]
                    },
                ]
            });

            return results;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

}

export default new ReferralCenterRepo;