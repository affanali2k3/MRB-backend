import BaseRoutes from "../../../router/base/BaseRouter";
import AgentReviewController from "../controller/AgentReviewController";
import AgentReviewsMiddleware from "../middleware/AgentReviewsMiddleware";

class AgentReviewRouter extends BaseRoutes {
  routes(): void {
    this.router.post(
      "/create/agent-to-agent-review",
      // AgentReviewsMiddleware.createReviewVerify,
      AgentReviewController.createAgentToAgentReview
    );

    this.router.get("/get/agent-to-agent-review", AgentReviewController.getAgentToAgentReviews);
  }
}

export default new AgentReviewRouter().router;
