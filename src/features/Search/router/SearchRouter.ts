<<<<<<< HEAD
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
=======
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
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
