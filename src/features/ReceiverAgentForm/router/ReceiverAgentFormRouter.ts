import BaseRoutes from "../../../router/base/BaseRouter";
import ReceiverAgentFormController from "../controller/ReceiverAgentFormController";

class ReceiverAgentFormRouter extends BaseRoutes {
    routes(): void {
        this.router.post('/create', ReceiverAgentFormController.createForm)
        this.router.get('/open-forms-received', ReceiverAgentFormController.getOpenFormsProposalsReceivedByUser)
        this.router.get('/direct-forms-received', ReceiverAgentFormController.getDirectFormsProposalsReceivedByUser)
    }
}

export default new ReceiverAgentFormRouter().router