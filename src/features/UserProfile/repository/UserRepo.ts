import { User } from "../model/User";


interface IUserRepo {
    create(user: User): Promise<void>
    update(user: User): Promise<void>
    delete(userSsn: string): Promise<void>
    getByEmail(email: string): Promise<User>
    getAll(userSsn: string): Promise<User[]>
}

export class UserRepo implements IUserRepo {
    async create(user: User): Promise<void> {
        try {
            await User.create({
                ...user
            })
        } catch (err) {
            throw new Error(`Failed to create user. ${err}`);
        }
    }
    async update(user: User): Promise<void> {
        try {
            const updatedUser = await User.findOne({
                where: {
                    email: user.email
                }
            })


            if (!updatedUser) throw new Error("User not found");

            updatedUser.email = user.email;
            updatedUser.ssn = user.ssn;
            updatedUser.name = user.name;
            updatedUser.licence = user.licence;
            updatedUser.photo = user.photo;
            updatedUser.occupation = user.occupation;
            updatedUser.gender = user.gender;
            updatedUser.licenceNumber = user.licenceNumber;
            updatedUser.licenceState = user.licenceState;
            updatedUser.yearLicenced = user.yearLicenced;
            updatedUser.address = user.address;
            updatedUser.completedDeals = user.completedDeals;
            updatedUser.previousDeals = user.previousDeals;

            updatedUser.save();

        } catch (err) {
            throw new Error(`Failed to update user. ${err}`);
        }

    }
    async delete(userSsn: string): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    ssn: userSsn
                }
            })

            if (!user) throw new Error("User not found");

            await user.destroy()

        } catch (err) {
            throw new Error("Failed to create user.");
        }
    }
    async getByEmail(email: string): Promise<User> {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) throw new Error("User not found");

            return user
        } catch (err) {
            throw new Error(`Failed to get user. ${err}`);
        }
    }
    async getAll(): Promise<User[]> {
        try {
            const users = await User.findAll()
            return users

        } catch (err) {
            throw new Error("Failed to create user.");
        }
    }

}