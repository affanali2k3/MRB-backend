import BaseRoutes from "../../../router/base/BaseRouter";
import AgentAnalyticController from "../controller/AgentAnalyticController";

class AgentAnalyticRouter extends BaseRoutes {
  routes(): void {
    this.router.get("/get-agent-analytic", AgentAnalyticController.getAgentAnalytic);
    this.router.patch("/update/referrals-received", AgentAnalyticController.updateReferralsReceived);
    this.router.patch("/update/referrals-sent", AgentAnalyticController.updateReferralsSent);
    this.router.patch("/update/houses-bought", AgentAnalyticController.incrementHousesBought);
    this.router.patch("/update/houses-sold", AgentAnalyticController.incrementHousesSold);
    this.router.patch("/update/referrals-sent", AgentAnalyticController.updateReferralsSent);
    this.router.patch("/update/agent-to-agent-rating", AgentAnalyticController.updateAgentToAgentRating);
  }
}

export default new AgentAnalyticRouter().router;
