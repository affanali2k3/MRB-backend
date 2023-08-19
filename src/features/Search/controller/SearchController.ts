import { Request, Response } from "express";
import SearchRepo from "../repository/SearchRepo";
import { User } from "../../UserProfile/model/User";

class SearchController {
    async searchUser(req: Request, res: Response) {
        try {
            // Get the user name to search for from the request parameters
            const userName: string = req.params.userName;

            // Use the SearchRepo to search for users with the provided user name
            const users: User[] = await SearchRepo.searchUser({ userName: userName });

            // Respond with the searched users
            res.status(200).json({
                message: "Users searched successfully",
                data: users
            });
        } catch (err) {
            // Handle any errors that occur during the search process
            res.status(500).json({
                message: `Failed to search users ${err}`,
            });
        }
    }
}

export default new SearchController;
