import SearchController from "../controller/SearchController";
import BaseRoutes from "../../../router/base/BaseRouter";

// Router class for handling search-related routes
class SearchRouter extends BaseRoutes {
    public routes(): void {
        // Define a route that searches for users by name
        this.router.get("/name/:userName", SearchController.searchUser);
    }
}

export default new SearchRouter().router;
