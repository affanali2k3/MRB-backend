import { User } from "../../UserProfile/model/User";
import { UserAssociates } from "../model/UserAssociates";
import { Op, Sequelize, UniqueConstraintError, literal } from "sequelize"; // Import the error class


interface IUserAssociatesRepo {
    sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    acceptRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    declineRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    cancelRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    getAllAssociates({ userEmail }: { userEmail: string }): Promise<User[]>;

    removeAssociate({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }): Promise<void>;

    checkRequestStatusWithUser({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }): Promise<UserAssociates | null>;
}

export class UserAssociatesRepo implements IUserAssociatesRepo {
    async sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            const existsAssociation: UserAssociates | null = await UserAssociates.findOne({
                where:
                {
                    [Op.or]: [{ userEmail: senderEmail, associateEmail: receiverEmail },
                    { userEmail: receiverEmail, associateEmail: senderEmail }]
                }
            })
            if (existsAssociation !== null) throw new Error('Association already exists');

            const newAssociation = new UserAssociates();


            newAssociation.userEmail = senderEmail;
            newAssociation.associateEmail = receiverEmail;
            newAssociation.status = 'Pending';

            await UserAssociates.create({ ...newAssociation.dataValues });
        } catch (err) {
            if (err instanceof UniqueConstraintError) throw new Error("Request already sent");
            throw new Error(`${err}`);
        }
    }
    async acceptRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {

            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });

            if (!association) throw new Error("There is no friend request");

            association.status = "Accepted";

            association.save();
        } catch (err) {

            throw new Error(`${err}`);
        }
    }
    async declineRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });

            if (!association) throw new Error("There is no friend request");

            association.status = "Rejected";

            association.save();
        } catch (err) {

            throw new Error(`${err}`);
        }
    }
    async cancelRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
            const association = await UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });

            if (!association) throw new Error("There is no friend request");

            association.destroy();
        } catch (err) {

            throw new Error(`${err}`);
        }
    }

    async getAllAssociates({ userEmail }: { userEmail: string }) {
        try {
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
            const userAssociates: UserAssociates | null = await UserAssociates.findOne({
                where: Sequelize.or({ userEmail: userEmail, associateEmail: associateEmail },
                    { userEmail: associateEmail, associateEmail: userEmail })
            });

            if (!userAssociates) throw new Error("There is no association");

            userAssociates.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async checkRequestStatusWithUser({ userEmail, associateEmail }: { userEmail: string, associateEmail: string }) {
        try {
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