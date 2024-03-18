import BaseRoutes from "../../../router/base/BaseRouter";
import ReceiverAgentFormController from "../controller/ReceiverAgentFormController";
import ReceiverAgentFormMiddleware from "../middleware/ReceiverAgentFormMiddleware";

class ReceiverAgentFormRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/create", ReceiverAgentFormController.createForm);
    // this.router.patch("/change-direct-form-considering-status", ReceiverAgentFormController.changeDirectFormConsideringStatus);
    // this.router.patch("/change-open-form-considering-status", ReceiverAgentFormController.changeOpenFormConsideringStatus);
    this.router.get("/forms-proposal-received", ReceiverAgentFormController.getFormsProposalsReceivedByUser);
    this.router.get("/open-forms-sent", ReceiverAgentFormController.getOpenFormsSentByUser);
    // this.router.get(
    //   "/direct-forms-received",
    //   ReceiverAgentFormMiddleware.getFormsVerify,
    //   ReceiverAgentFormController.getDirectFormsProposalsReceivedByUser
    // );
    this.router.patch("/reject-received-proposal", ReceiverAgentFormController.rejectReceivedProposal);
    this.router.patch("/accept-received-proposal", ReceiverAgentFormController.acceptReceivedProposal);
  }
}

export default new ReceiverAgentFormRouter().router;
