import SearchController from "../controller/SearchController";
import BaseRoutes from "../../../router/base/BaseRouter";

class SearchRouter extends BaseRoutes {
    public routes(): void {
        this.router.get("/name/:userName", SearchController.searchUser);
    }
}

export default new SearchRouter().router