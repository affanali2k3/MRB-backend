import BaseRoutes from "../../../router/base/BaseRouter";
import RecommendController from "../controller/RecommendController";

class RecommendRouter extends BaseRoutes {
  routes(): void {
    // this.router.get("/get-all-agents", RecommendController.getAllAgents);
    this.router.get("/get-agents", RecommendController.getAgentsFiltered);
  }
}

export default new RecommendRouter().router;
