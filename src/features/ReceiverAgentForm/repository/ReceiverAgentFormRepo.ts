import { SenderAgentFormType } from "../../SenderAgentForm/controller/SenderAgentFormController";
import { ReceiverAgentFormType, ReceiverAgentFormValues } from "../controller/ReceiverAgentFormController";
import { ReceiverAgentDirectForm } from "../model/ReceiverAgentDirectFormModel";
import { ReceiverAgentOpenForm } from "../model/ReceiverAgentOpenForm";


interface IReceiverAgentFormRepo {
    createForm(values: ReceiverAgentFormValues): Promise<void>
}

class SenderAgentFormRepo implements IReceiverAgentFormRepo {
    async createForm(values: ReceiverAgentFormValues): Promise<void> {
        try {
            if (values.formType === ReceiverAgentFormType.Direct) {
                const receiverAgentDirectForm = new ReceiverAgentDirectForm();
                receiverAgentDirectForm.receiverAgent = values.receiverAgent;
                receiverAgentDirectForm.senderAgentFormId = values.senderAgentFormId;
                receiverAgentDirectForm.proposal = values.proposal;


                await receiverAgentDirectForm.save();
            }
            else if (values.formType === ReceiverAgentFormType.Open) {
                const receiverAgentopenForm = new ReceiverAgentOpenForm();

                receiverAgentopenForm.receiverAgent = values.receiverAgent;
                receiverAgentopenForm.senderAgentFormId = values.senderAgentFormId;
                receiverAgentopenForm.proposal = values.proposal;

                await receiverAgentopenForm.save();
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}

export default new SenderAgentFormRepo