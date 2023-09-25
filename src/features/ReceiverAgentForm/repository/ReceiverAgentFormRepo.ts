import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { SenderAgentFormType } from "../../SenderAgentForm/controller/SenderAgentFormController";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { ReceiverAgentFormType, ReceiverAgentFormValues } from "../controller/ReceiverAgentFormController";
import { ReceiverAgentDirectForm } from "../model/ReceiverAgentDirectFormModel";
import { ReceiverAgentOpenForm } from "../model/ReceiverAgentOpenForm";

enum ReceiverAgentFormStatus {Awaiting = 'Awaiting', Accepted = 'Accepted', Rejected = 'Rejected'}


interface IReceiverAgentFormRepo {
    createForm(values: ReceiverAgentFormValues): Promise<void>
    getOpenFormsProposalsReceivedByUser({userId}: {userId: number}): Promise<ReceiverAgentOpenForm[]>
    getDirectFormsProposalsReceivedByUser({userId}: {userId: number}): Promise<ReceiverAgentDirectForm[]>
    getOpenFormsSent({ userId }: { userId: number; }): Promise<ReceiverAgentOpenForm[]>
}

class SenderAgentFormRepo implements IReceiverAgentFormRepo {
    async getOpenFormsProposalsReceivedByUser({ userId }: { userId: number; }): Promise<ReceiverAgentOpenForm[]> {
        try{
            const openFormsProposalsReceived: ReceiverAgentOpenForm[] = await ReceiverAgentOpenForm.findAll(
                {
                    where: {
                        receiverAgent: userId,
                        
                    },
                    include: [
                        {
                            model: SenderAgentOpenForm,
                            include: [
                                {
                                    model: User,
                                    include: [
                                        {
                                            model: AgentAnalytic
                                        }
                                    ]
                                }
                            ]
                           
                        },
                        
                    ]
                }
            )

            return openFormsProposalsReceived;
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async getDirectFormsProposalsReceivedByUser({ userId }: { userId: number; }): Promise<ReceiverAgentDirectForm[]> {
        try{
            const directFormsProposalsReceived: ReceiverAgentDirectForm[] = await ReceiverAgentDirectForm.findAll(
                {
                    where: {
                        receiverAgent: userId
                    }
                }
            )

            return directFormsProposalsReceived;
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async getOpenFormsSent({ userId }: { userId: number; }): Promise<ReceiverAgentOpenForm[]> {
        try{
            const formsSent: ReceiverAgentOpenForm[] = await ReceiverAgentOpenForm.findAll(
                {
                    where: {
                        receiverAgent: userId,
                    },
                    include: [
                        {
                            model: SenderAgentOpenForm,
                            include: [
                                {
                                    model: User,
                                }
                            ]
                        }
                    ]
                }
            )

            return formsSent;
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    
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
                receiverAgentopenForm.status = ReceiverAgentFormStatus.Awaiting;

                await receiverAgentopenForm.save();
            }
        } catch (err) {
            throw new Error(`${err}`);
        }

        
    }
    

}

export default new SenderAgentFormRepo