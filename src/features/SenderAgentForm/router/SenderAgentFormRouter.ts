import BaseRoutes from "../../../router/base/BaseRouter";
import SenderAgentFormController from "../controller/SenderAgentFormController";
import SenderAgentFormMiddleware from "../middleware/SenderAgentFormMiddleware";

class SenderAgentFormRouter extends BaseRoutes {
  routes(): void {
    this.router.post(
      "/create",
      SenderAgentFormMiddleware.createFormVerify,
      SenderAgentFormController.createForm
    );
    this.router.get(
      "/get-direct-forms-sent",
      SenderAgentFormMiddleware.getFormsVerify,
      SenderAgentFormController.getDirectFormsSentByUser
    );
    this.router.get(
      "/get-open-forms-sent",
      SenderAgentFormMiddleware.getFormsVerify,
      SenderAgentFormController.getOpenFormsSentByUser
    );
    this.router.get(
      "/get-forms-received",
      SenderAgentFormMiddleware.getFormsVerify,
      SenderAgentFormController.getFormsReceivedByUser
    );
  }
}

export default new SenderAgentFormRouter().router;
