<<<<<<< HEAD
import { User } from "../model/User";

// Define the interface for UserRepo
interface IUserRepo {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(userSsn: string): Promise<void>;
    getByEmail(email: string): Promise<User>;
    getAll(): Promise<User[]>;
}

// Implement the UserRepo class
export class UserRepo implements IUserRepo {
    // Create a new user
    async create(user: User): Promise<void> {
        try {
            await User.create({
                ...user
            });
        } catch (err) {
            throw new Error(`Failed to create user. ${err}`);
        }
    }

    // Update an existing user
    async update(user: User): Promise<void> {
        try {
            const updatedUser = await User.findOne({
                where: {
                    id: user.id
                }
            });

            if (!updatedUser) throw new Error("User not found");

            // Update user properties
            updatedUser.email = user.email;
            updatedUser.name = user.name;
            updatedUser.licence = user.licence;
            updatedUser.photo = user.photo;
            updatedUser.city = user.city;
            updatedUser.state = user.state;
            updatedUser.county = user.county;
            updatedUser.gender = user.gender;
          
            updatedUser.yearLicenced = user.yearLicenced;
            updatedUser.address = user.address;
     

            // Save the updated user
            updatedUser.save();
        } catch (err) {
            throw new Error(`Failed to update user. ${err}`);
        }
    }

    // Delete a user
    async delete(userSsn: string): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    ssn: userSsn
                }
            });

            if (!user) throw new Error("User not found");

            // Delete the user
            await user.destroy();
        } catch (err) {
            throw new Error("Failed to delete user.");
        }
    }

    // Get user by email
    async getByEmail(email: string): Promise<User> {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) throw new Error("User not found");

            return user;
        } catch (err) {
            throw new Error(`Failed to get user. ${err}`);
        }
    }

    // Get all users
    async getAll(): Promise<User[]> {
        try {
            const users = await User.findAll();
            return users;
        } catch (err) {
            throw new Error("Failed to get users.");
        }
    }
}
=======
import { User } from "../model/User";

// Define the interface for UserRepo
interface IUserRepo {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(userSsn: string): Promise<void>;
    getUserByEmail(userEmail: string): Promise<User>;
    getUser(userId: number): Promise<User>;
    getAll(): Promise<User[]>;
}

// Implement the UserRepo class
export class UserRepo implements IUserRepo {
    // Create a new user
    async create(user: User): Promise<void> {
        try {
            await User.create({
                ...user
            });
        } catch (err) {
            throw new Error(`Failed to create user. ${err}`);
        }
    }

    // Update an existing user
    async update(user: User): Promise<void> {
        try {
            const updatedUser = await User.findOne({
                where: {
                    email: user.email
                }
            });

            if (!updatedUser) throw new Error("User not found");

            // Update user properties
            updatedUser.email = user.email;
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
            updatedUser.yearsOfExperience = user.yearsOfExperience;

            // Save the updated user
            updatedUser.save();
        } catch (err) {
            throw new Error(`Failed to update user. ${err}`);
        }
    }

    // Delete a user
    async delete(userSsn: string): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    ssn: userSsn
                }
            });

            if (!user) throw new Error("User not found");

            // Delete the user
            await user.destroy();
        } catch (err) {
            throw new Error("Failed to delete user.");
        }
    }

    // Get user by email
    async getUser(userId: number): Promise<User> {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) throw new Error("User not found");

            return user;
        } catch (err) {
            throw new Error(`Failed to get user. ${err}`);
        }
    }
    async getUserByEmail(userEmail: string): Promise<User> {
        try {
            console.log(userEmail)
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });

            if (!user) throw new Error("User not found");

            return user;
        } catch (err) {
            throw new Error(`Failed to get user. ${err}`);
        }
    }

    // Get all users
    async getAll(): Promise<User[]> {
        try {
            const users = await User.findAll();
            return users;
        } catch (err) {
            throw new Error("Failed to get users.");
        }
    }
}
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
