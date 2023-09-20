<<<<<<< HEAD
import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import FeedController from "../controller/FeedController"; // Import the FeedController

// Define a router class for feed-related routes
class FeedRouter extends BaseRoutes {
    // Override the routes method to define specific routes for the FeedRouter
    public routes(): void {
        // Define a GET route to retrieve the user's feed based on email and page number,
        // using the getFeedForUser method from the FeedController
        this.router.get("/:userEmail/:page", FeedController.getFeedForUser);
    }
}

// Export an instance of the FeedRouter class with its defined routes
export default new FeedRouter().router;
=======
import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import FeedController from "../controller/FeedController"; // Import the FeedController

// Define a router class for feed-related routes
class FeedRouter extends BaseRoutes {
    // Override the routes method to define specific routes for the FeedRouter
    public routes(): void {
        // Define a GET route to retrieve the user's feed based on email and page number,
        // using the getFeedForUser method from the FeedController
        this.router.get("/get/", FeedController.getFeedForUser);
    }
}

// Export an instance of the FeedRouter class with its defined routes
export default new FeedRouter().router;
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
