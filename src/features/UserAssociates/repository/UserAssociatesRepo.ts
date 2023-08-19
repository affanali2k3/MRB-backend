import { User } from "../../UserProfile/model/User";
import { UserAssociates } from "../model/UserAssociates";
import { Op, Sequelize, UniqueConstraintError, literal } from "sequelize"; // Import the error class


interface IUserAssociatesRepo {
    // Sends a friend request from sender to receiver
    sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    // Accepts a friend request from sender to receiver
    acceptRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    // Declines a friend request from sender to receiver
    declineRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    // Cancels a friend request from sender to receiver or vice versa
    cancelRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    // Retrieves all user's associates with "Accepted" status
    getAllAssociates({ userEmail }: { userEmail: string }): Promise<User[]>;

    // Removes an associate relationship between two users
    removeAssociate({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }): Promise<void>;

    // Checks the friend request status between two users
    checkRequestStatusWithUser({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }): Promise<UserAssociates | null>;
}


export class UserAssociatesRepo implements IUserAssociatesRepo {
    async sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            // Check if an association already exists between sender and receiver
            const existsAssociation: UserAssociates | null = await UserAssociates.findOne({
                where:
                {
                    [Op.or]: [{ userEmail: senderEmail, associateEmail: receiverEmail },
                    { userEmail: receiverEmail, associateEmail: senderEmail }]
                }
            })
            if (existsAssociation !== null) throw new Error('Association already exists');
    
            // Create a new UserAssociates instance with pending status
            const newAssociation = new UserAssociates();
            newAssociation.userEmail = senderEmail;
            newAssociation.associateEmail = receiverEmail;
            newAssociation.status = 'Pending';
    
            // Save the new association
            await UserAssociates.create({ ...newAssociation.dataValues });
        } catch (err) {
            // Handle unique constraint error (Request already sent)
            if (err instanceof UniqueConstraintError) throw new Error("Request already sent");
            throw new Error(`${err}`);
        }
    }
    
    async acceptRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            // Find the association between sender and receiver
            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
    
            if (!association) throw new Error("There is no friend request");
    
            // Update the association's status to "Accepted"
            association.status = "Accepted";
    
            // Save the updated association
            await association.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    async declineRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            // Find the association between sender and receiver
            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
    
            if (!association) throw new Error("There is no friend request");
    
            // Update the association's status to "Rejected"
            association.status = "Rejected";
    
            // Save the updated association
            await association.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    async cancelRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            // Find the association between sender and receiver
            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
    
            if (!association) throw new Error("There is no friend request");
    
            // Delete the association
            await association.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    async getAllAssociates({ userEmail }: { userEmail: string }) {
        try {
            // Fetch all users associated with the provided user's email and with "Accepted" status
            const usersWithAcceptedAssociates = await User.findAll({
                where: {
                    user_email: {
                        [Op.in]: literal(`(
                      SELECT associate_email
                      FROM user_associates
                      WHERE user_email = '${userEmail}' AND association_status = 'Accepted'
                      UNION
                      SELECT user_email
                      FROM user_associates
                      WHERE associate_email = '${userEmail}' AND association_status = 'Accepted'
                      )
                    `),
                    },
                },
            });
            return usersWithAcceptedAssociates;
    
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    async removeAssociate({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }) {
        try {
            // Find the association between the provided user emails
            const userAssociates: UserAssociates | null = await UserAssociates.findOne({
                where: Sequelize.or({ userEmail: userEmail, associateEmail: associateEmail },
                    { userEmail: associateEmail, associateEmail: userEmail })
            });
    
            if (!userAssociates) throw new Error("There is no association");
    
            // Delete the association
            await userAssociates.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    async checkRequestStatusWithUser({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }) {
        try {
            // Find the association between the provided user emails
            const userAssociates: UserAssociates | null = await UserAssociates.findOne({
                where: Sequelize.or({ userEmail: userEmail, associateEmail: associateEmail },
                    { userEmail: associateEmail, associateEmail: userEmail })
            });
    
            if (!userAssociates) return null;
    
            return userAssociates;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    

}

export default UserAssociatesRepo;