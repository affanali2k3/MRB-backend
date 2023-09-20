import BaseRoutes from "../../../router/base/BaseRouter";
import SenderAgentFormController from "../controller/SenderAgentFormController";

class SenderAgentFormRouter extends BaseRoutes {
    routes(): void {
        this.router.post('/create', SenderAgentFormController.createForm)
        this.router.get('/getDirectFormsSent/:userEmail', SenderAgentFormController.getDirectFormsSentByUser)
        this.router.get('/getOpenFormsSent/:userEmail', SenderAgentFormController.getOpenFormsSentByUser)
        this.router.get('/getFormsReceived/:userEmail', SenderAgentFormController.getFormsReceivedByUser)
    }
}

export default new SenderAgentFormRouter().router