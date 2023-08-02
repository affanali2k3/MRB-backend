import { UserAssociates } from "../model/UserAssociates";
import { UniqueConstraintError } from "sequelize"; // Import the error class


interface IUserAssociatesRepo {
    sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    acceptRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void>;

    // declineRequest(senderEmail: string, receiverEmail: string): Promise<void>;

    // cancelRequest(senderEmail: string, receiverEmail: string): Promise<void>;
}

export class UserAssociatesRepo implements IUserAssociatesRepo {
    async sendRequest({ senderEmail, receiverEmail }: { senderEmail: string, receiverEmail: string }): Promise<void> {
        try {
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
    // declineRequest(senderEmail: string, receiverEmail: string): Promise<void> {
    //     try {

    //     } catch (err) {

    //         throw new Error(`Failed to decline request: ${err}`);
    //     }
    // }
    // cancelRequest(senderEmail: string, receiverEmail: string): Promise<void> {
    //     try {

    //     } catch (err) {

    //         throw new Error(`Failed to cancel request: ${err}`);
    //     }
    // }

}