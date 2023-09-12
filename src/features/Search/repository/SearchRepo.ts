import { Op } from "sequelize";
import { User } from "../../UserProfile/model/User";

// Interface defining the methods that the SearchRepo class should implement
interface ISearchRepo {
    searchUser({ userName }: { userName: string }): Promise<User[]>;
}

// Implementation of the ISearchRepo interface
class SearchRepo implements ISearchRepo {
    async searchUser({ userName }: { userName: string; }): Promise<User[]> {
        try {
            // Use Sequelize to find users whose name contains the provided userName
            const users: User[] = await User.findAll({ where: { name: { [Op.iLike]: `%${userName}%` } } });
            return users;
        } catch (err) {
            // If an error occurs, throw a new error with the error message
            throw new Error(`${err}`);
        }
    }
}

export default new SearchRepo;
