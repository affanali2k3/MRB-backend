import BaseRoutes from "../../../router/base/BaseRouter";
import PostShareController from "../controller/PostShareController";

// Define the PostRouter class, extending from BaseRoutes
class PostRouter extends BaseRoutes {
    public routes(): void {
        // Route to get all posts shared by a specific user
        this.router.get("/:userEmail", PostShareController.getPostSharedByUser);

        // Route to share a new post for a specific user
        // URL format: /:userEmail/:postId
        this.router.post("/:userEmail/:postId", PostShareController.sharePost);

       
        
    }
}

// Export an instance of the PostRouter class
export default new PostRouter().router;
