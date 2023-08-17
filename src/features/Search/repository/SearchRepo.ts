import { Op } from "sequelize";
import { User } from "../../UserProfile/model/User";


interface ISearchRepo {
    searchUser({ userName }: { userName: string }): Promise<User[]>;
}

class SearchRepo implements ISearchRepo {
    async searchUser({ userName }: { userName: string; }): Promise<User[]> {
        try {
            const users: User[] = await User.findAll({ where: { name: { [Op.iLike]: `%${userName}%` } } });
            return users;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new SearchRepo;