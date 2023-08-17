import { Request, Response } from "express";
import SearchRepo from "../repository/SearchRepo";
import { User } from "../../UserProfile/model/User";
class SearchController {
    async searchUser(req: Request, res: Response) {
        try {
            const userName: string = req.params.userName;
            const users: User[] = await SearchRepo.searchUser({ userName: userName });
            res.status(200).json({
                message: "Users searched succesfully",
                data: users
            });
        } catch (err) {
            res.status(200).json({
                message: `Failed to search users ${err}`,
            });

        }
    }
}

export default new SearchController;