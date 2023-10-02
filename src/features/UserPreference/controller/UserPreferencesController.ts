
import { Request, Response } from "express";
import UserPreferences from "../model/UserPreferenceModel";
import UserPreferencesRepo from "../repository/UserPreferencesRepo";

export interface UserPreferencesData {
    state?: string,
    city?: string,
    minTimeAmount?: number,
    maxTimeAmount?: number,
    minCost?: number,
    maxCost?: number,
    clientType?: string,
    houseType?: string,
    userId: number
}


class UserPreferencesController{

    async updatePreference(req: Request, res: Response){
        try{
            const reqBody: UserPreferencesData = req.body;
            console.log(reqBody);

            console.log(reqBody)
            const userPreference: UserPreferences = await UserPreferencesRepo.updatePreference(reqBody);


            res.status(200).send({
                message: "Updated preferences successfully",
                data: userPreference
            })
        }catch(err: any){
            res.status(500).send({
                message: "Failed to update preferences",
                error: err.toString()
            })
        }
    }

    async getPreferences(req: Request, res: Response){
        try{
            const userIdString: string = req.query.userId as string;

            const userId: number = parseInt(userIdString);

            const userPreference: UserPreferences = await UserPreferencesRepo.getPreference({userId: userId});

            res.status(200).send({
                message: "Got preferences successfully",
                data: userPreference
            })
        }catch(err: any){
            res.status(500).send({
                message: "Failed to get preferences",
                error: err.toString()
            })
        }
    }
}

export default new UserPreferencesController