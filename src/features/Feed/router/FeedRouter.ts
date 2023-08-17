import BaseRoutes from "../../../router/base/BaseRouter";
import FeedController from "../controller/FeedController";


class FeedRouter extends BaseRoutes {
    public routes(): void {
        this.router.get("/:userEmail/:page", FeedController.getFeedForUser);
    }
}

export default new FeedRouter().router