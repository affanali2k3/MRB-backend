import BaseRoutes from "../../../router/base/BaseRouter";
import SenderAgentFormController from "../controller/SenderAgentFormController";
import SenderAgentFormMiddleware from "../middleware/SenderAgentFormMiddleware";

class SenderAgentFormRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/create", SenderAgentFormController.createForm);
    this.router.get("/get-direct-forms-sent", SenderAgentFormController.getDirectFormsSentByUser);
    this.router.get("/get-open-forms-sent", SenderAgentFormController.getOpenFormsSentByUser);
    this.router.get("/get-forms-received", SenderAgentFormController.getFormsReceivedByUser);
  }
}

export default new SenderAgentFormRouter().router;
