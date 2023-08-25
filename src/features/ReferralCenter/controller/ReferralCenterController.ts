import { Request, Response } from "express";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { Op, Sequelize } from "sequelize";
import ReferralCenterRepo from "../repository/ReferralCenterRepo";


export interface SearchData {
    state?: string,
    city?: string,
    agentYearsOfExperience?: number,
    isAgentOnTeam?: boolean,
    rating?: number,
}

class ReferralCenterController {

    async searchForLeads(req: Request, res: Response) {
        try {
            // const state: string | undefined = req.query.state as string;
            // const city: string | undefined = req.query.state as string;
            // const agentYearsOfExperience: number | undefined = parseInt(req.query.state as string);
            // const isAgentOnTeam: boolean | undefined = req.query.isAgentOnTeam === 'true';
            // const rating: number | undefined = parseInt(req.query.rating as string);

            const reqBody: SearchData = req.query;


            console.log(reqBody);

            const results: SenderAgentOpenForm[] = await ReferralCenterRepo.searchForLeads(reqBody);

            res.status(200).send({
                message: "Searched for leads succesfully",
                data: results
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