import BaseRoutes from "../../../router/base/BaseRouter";
import AgentAnalyticController from "../controller/AgentAnalyticController";


class AgentAnalyticRouter extends BaseRoutes {
    routes(): void {
        this.router.post('/create', AgentAnalyticController.createAnalytic);
        this.router.delete('/delete/:analyticId', AgentAnalyticController.deleteAnalytic);
        this.router.patch('/update/referrals-received', AgentAnalyticController.updateReferralsReceived);
        this.router.get('/get-agent-analytic/:userId', AgentAnalyticController.getAgentAnalytic);
        this.router.patch('/update/referrals-sent', AgentAnalyticController.updateReferralsSent);
        this.router.patch('/update/agent-to-agent-rating', AgentAnalyticController.updateAgentToAgentRating);
        this.router.patch('/update/client-to-agent-rating', AgentAnalyticController.updateClientToAgentRating);
    }
}

export default new AgentAnalyticRouter().router;