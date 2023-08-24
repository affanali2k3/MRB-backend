import { Request, Response } from "express";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { Op, Sequelize } from "sequelize";


export interface SearchData {
    state: string,
    city: string,
    agentYearsOfExperience: number,
    isAgentOnTeam: boolean,
    rating: number,
}

class ReferralCenterController {

    async searchForLeads(req: Request, res: Response) {
        try {
            console.log('here');
            const result = await SenderAgentOpenForm.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id'],
                        on: Sequelize.literal('"User"."user_email" = "SenderAgentOpenForm"."sender_agent_open_forms_sender_agent"::text')
                    }
                ]



            });
            console.log(result);
            console.log('done')
            res.status(200).send({
                message: "Searched for leads succesfully",
                data: result
            })
        } catch (err: any) {
            res.status(500).send({
                message: "Error searching for leads",
                error: err.toString()
            })
        }
    }
}

export default new ReferralCenterController