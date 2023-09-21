import { SenderAgentFormType, SenderAgentFormValues } from "../controller/SenderAgentFormController";
import { SenderAgentDirectForm } from "../model/SenderAgentDirectForm"
import { SenderAgentOpenForm } from "../model/SenderAgentOpenForm";


interface ISenderAgentFormRepo {
    // Create a new sender agent form to share a lead with others. This may be direct or open
    createForm(values: SenderAgentFormValues): Promise<void>
    // Get Direct forms sent to a specific agent
    getDirectFormsSentByUser({ userId }: { userId: number }): Promise<SenderAgentDirectForm[]>
    // Get open forms which can be seen by anyone
    getOpenFormsSentByUser({ userId }: { userId: number }): Promise<SenderAgentOpenForm[]>
    // Get received forms for a specific agent
    getFormsReceivedByUser({ userId }: { userId: number }): Promise<SenderAgentDirectForm[]>
}

class SenderAgentFormRepo implements ISenderAgentFormRepo {
    async getDirectFormsSentByUser({ userId }: { userId: number; }): Promise<SenderAgentDirectForm[]> {
        try {
            const formsSent: SenderAgentDirectForm[] = await SenderAgentDirectForm.findAll({ where: { senderAgent: userId } });

            return formsSent;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async getOpenFormsSentByUser({ userId }: { userId: number; }): Promise<SenderAgentOpenForm[]> {
        try {
            const formsSentToPublic: SenderAgentOpenForm[] = await SenderAgentOpenForm.findAll({ where: { senderAgent: userId } });

            return formsSentToPublic;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async getFormsReceivedByUser({ userId }: { userId: number; }): Promise<SenderAgentDirectForm[]> {
        try {
            const formsReceived: SenderAgentDirectForm[] = await SenderAgentDirectForm.findAll({ where: { receiverAgent: userId } });

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
                senderAgentDirectForm.timeAmount = values.time_amount;
                senderAgentDirectForm.timeUnit = values.time_unit;
                senderAgentDirectForm.details = values.details;
                senderAgentDirectForm.typeOfHouse = values.typeOfHouse;
          
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
                senderAgentopenForm.timeAmount = values.time_amount;
                senderAgentopenForm.timeUnit = values.time_unit;
                senderAgentopenForm.providence = values.providence;
                senderAgentopenForm.details = values.details;
                senderAgentopenForm.typeOfHouse = values.typeOfHouse;
                senderAgentopenForm.price = values.price;

                await senderAgentopenForm.save();
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}

export default new SenderAgentFormRepo