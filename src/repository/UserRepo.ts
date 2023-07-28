import { User } from "../models/User";


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
            console.log(user)
            const updatedUser = await User.findOne({
                where: {
                    ssn: user.ssn
                }
            })

            if (!updatedUser) throw new Error("User not found");

            updatedUser.ssn = user.ssn;
            updatedUser.phone = user.phone;
            updatedUser.occupation = user.occupation;

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