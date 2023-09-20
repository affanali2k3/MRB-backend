import { SenderAgentFormType, SenderAgentFormValues } from "../controller/SenderAgentFormController";
import { SenderAgentDirectForm } from "../model/SenderAgentDirectForm"
import { SenderAgentOpenForm } from "../model/SenderAgentOpenForm";


interface ISenderAgentFormRepo {
    // Create a new sender agent form to share a lead with others. This may be direct or open
    createForm(values: SenderAgentFormValues): Promise<void>
    // Get Direct forms sent to a specific agent
    getDirectFormsSentByUser({ userEmail }: { userEmail: string }): Promise<SenderAgentDirectForm[]>
    // Get open forms which can be seen by anyone
    getOpenFormsSentByUser({ userEmail }: { userEmail: string }): Promise<SenderAgentOpenForm[]>
    // Get received forms for a specific agent
    getFormsReceivedByUser({ userEmail }: { userEmail: string }): Promise<SenderAgentDirectForm[]>
}

class SenderAgentFormRepo implements ISenderAgentFormRepo {
    async getDirectFormsSentByUser({ userEmail }: { userEmail: string; }): Promise<SenderAgentDirectForm[]> {
        try {
            const formsSent: SenderAgentDirectForm[] = await SenderAgentDirectForm.findAll({ where: { senderAgent: userEmail } });

            return formsSent;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async getOpenFormsSentByUser({ userEmail }: { userEmail: string; }): Promise<SenderAgentOpenForm[]> {
        try {
            const formsSentToPublic: SenderAgentOpenForm[] = await SenderAgentOpenForm.findAll({ where: { senderAgent: userEmail } });

            return formsSentToPublic;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async getFormsReceivedByUser({ userEmail }: { userEmail: string; }): Promise<SenderAgentDirectForm[]> {
        try {
            const formsReceived: SenderAgentDirectForm[] = await SenderAgentDirectForm.findAll({ where: { receiverAgent: userEmail } });

            return formsReceived;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async createForm(values: SenderAgentFormValues): Promise<void> {
        try {
            if (values.formType === SenderAgentFormType.Direct) {
                const senderAgentDirectForm = new SenderAgentDirectForm();

                senderAgentDirectForm.senderAgent = values.senderAgent;
                senderAgentDirectForm.isBuyer = values.isBuyer;
                senderAgentDirectForm.receiverAgent = values.receiverAgent;
                senderAgentDirectForm.isBuyer = values.isBuyer;
                senderAgentDirectForm.city = values.city;
                senderAgentDirectForm.state = values.state;
                senderAgentDirectForm.desiredDate = values.desiredDate;
                senderAgentDirectForm.providence = values.providence;
                senderAgentDirectForm.price = values.price;

                await senderAgentDirectForm.save();
            }
            else if (values.formType === SenderAgentFormType.Open) {
                const senderAgentopenForm = new SenderAgentOpenForm();

                senderAgentopenForm.senderAgent = values.senderAgent;
                senderAgentopenForm.isBuyer = values.isBuyer;
                senderAgentopenForm.isBuyer = values.isBuyer;
                senderAgentopenForm.city = values.city;
                senderAgentopenForm.state = values.state;
                senderAgentopenForm.desiredDate = values.desiredDate;
                senderAgentopenForm.providence = values.providence;
                senderAgentopenForm.price = values.price;

                await senderAgentopenForm.save();
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}

export default new SenderAgentFormRepo