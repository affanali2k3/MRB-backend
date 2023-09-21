import BaseRoutes from "../../../router/base/BaseRouter";
import SenderAgentFormController from "../controller/SenderAgentFormController";

class SenderAgentFormRouter extends BaseRoutes {
    routes(): void {
        this.router.post('/create', SenderAgentFormController.createForm)
        this.router.get('/getDirectFormsSent/:userId', SenderAgentFormController.getDirectFormsSentByUser)
        this.router.get('/getOpenFormsSent/:userId', SenderAgentFormController.getOpenFormsSentByUser)
        this.router.get('/getFormsReceived/:userId', SenderAgentFormController.getFormsReceivedByUser)
    }
}

export default new SenderAgentFormRouter().router