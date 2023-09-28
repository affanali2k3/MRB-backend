import BaseRoutes from "../../../router/base/BaseRouter";
import RecommendController from "../controller/RecommendController";


class RecommendRouter extends BaseRoutes {

    routes(): void {

        this.router.get('/getBestAgent', RecommendController.getBestAgent);
    }
}

export default new RecommendRouter().router