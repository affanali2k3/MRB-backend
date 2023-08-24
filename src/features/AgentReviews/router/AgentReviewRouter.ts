import BaseRoutes from "../../../router/base/BaseRouter";
import AgentReviewController from "../controller/AgentReviewController";


class AgentReviewRouter extends BaseRoutes {

    routes(): void {
        this.router.post('/create/agent-to-agent-review', AgentReviewController.createAgentToAgentReview);
        this.router.post('/create/client-to-agent-review', AgentReviewController.createClientToAgentReview);
        this.router.get('/get/agent-to-agent-review/:agentId', AgentReviewController.getAgentToAgentReviews);
        this.router.get('/get/client-to-agent-review/:agentId', AgentReviewController.getClientToAgentReviews);
        this.router.delete('/delete/agent-to-agent-review/:reviewId', AgentReviewController.deleteAgentToAgentReview);
        this.router.delete('/delete/client-to-agent-review/:reviewId', AgentReviewController.deleteClientToAgentReview);
    }
}

export default new AgentReviewRouter().router