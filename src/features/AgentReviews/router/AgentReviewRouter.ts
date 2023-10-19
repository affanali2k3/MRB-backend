import BaseRoutes from "../../../router/base/BaseRouter";
import AgentReviewController from "../controller/AgentReviewController";
import AgentReviewsMiddleware from "../middleware/AgentReviewsMiddleware";

class AgentReviewRouter extends BaseRoutes {
  routes(): void {
    this.router.post(
      "/create/agent-to-agent-review",
      AgentReviewsMiddleware.createReviewVerify,
      AgentReviewController.createAgentToAgentReview
    );
    this.router.post(
      "/create/client-to-agent-review",
      AgentReviewsMiddleware.createReviewVerify,
      AgentReviewController.createClientToAgentReview
    );
    this.router.get(
      "/get/agent-to-agent-review",
      AgentReviewController.getAgentToAgentReviews
    );
    this.router.get(
      "/get/client-to-agent-review",
      AgentReviewController.getClientToAgentReviews
    );
    this.router.delete(
      "/delete/agent-to-agent-review",
      AgentReviewController.deleteAgentToAgentReview
    );
    this.router.delete(
      "/delete/client-to-agent-review",
      AgentReviewController.deleteClientToAgentReview
    );
  }
}

export default new AgentReviewRouter().router;
