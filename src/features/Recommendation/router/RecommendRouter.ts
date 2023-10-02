import BaseRoutes from "../../../router/base/BaseRouter";
import RecommendController from "../controller/RecommendController";


class RecommendRouter extends BaseRoutes {

    routes(): void {

        this.router.get('/getAllAgents', RecommendController.getAllAgents);
        this.router.get('/getBestAgents', RecommendController.getBestAgents);
    }
}

export default new RecommendRouter().router