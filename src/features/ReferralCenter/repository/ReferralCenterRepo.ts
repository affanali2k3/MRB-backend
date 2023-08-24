import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { SearchData } from "../controller/ReferralCenterController";


interface IReferralCenterRepo {
    searchForLeads(data: SearchData): Promise<SenderAgentOpenForm[]>
}

class ReferralCenterRepo implements IReferralCenterRepo {
    async searchForLeads(data: SearchData): Promise<SenderAgentOpenForm[]> {
        try {
            const senderAgentOpenForms = await SenderAgentOpenForm.findAll({ where: })
        } catch (err) {
            throw new Error(`${err}`)
        }
    }

}