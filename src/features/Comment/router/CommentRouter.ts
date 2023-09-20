<<<<<<< HEAD
import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import CommentController from "../controller/CommentController"; // Import the CommentController

// Define a router class for comment-related routes
class CommentRouter extends BaseRoutes {
    // Override the routes method to define specific routes for the CommentRouter
    public routes(): void {
        // Define a POST route to save a comment, using the saveComment method from the CommentController
        this.router.post("/", CommentController.saveComment);
        
        // Define a GET route to get comments for a specific post, using the getPostComments method from the CommentController
        this.router.get("/:postId", CommentController.getPostComments);
    }
}

// Export an instance of the CommentRouter class with its defined routes
export default new CommentRouter().router;
=======
import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import CommentController from "../controller/CommentController"; // Import the CommentController

// Define a router class for comment-related routes
class CommentRouter extends BaseRoutes {
    // Override the routes method to define specific routes for the CommentRouter
    public routes(): void {
        // Define a POST route to save a comment, using the saveComment method from the CommentController
        this.router.post("/", CommentController.saveComment);
        
        // Define a GET route to get comments for a specific post, using the getPostComments method from the CommentController
        this.router.get("/:postId", CommentController.getPostComments);
    }
}

// Export an instance of the CommentRouter class with its defined routes
export default new CommentRouter().router;
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
