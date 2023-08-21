import BaseRoutes from "../../../router/base/BaseRouter";
import ReceiverAgentFormController from "../controller/ReceiverAgentFormController";

class ReceiverAgentFormRouter extends BaseRoutes {
    routes(): void {
        this.router.post('/create', ReceiverAgentFormController.createForm)
    }
}

export default new ReceiverAgentFormRouter().router