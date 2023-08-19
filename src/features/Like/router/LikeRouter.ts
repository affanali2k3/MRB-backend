import BaseRoutes from "../../../router/base/BaseRouter"; // Import the BaseRoutes class
import multer from "multer"; // Import the multer middleware for handling file uploads
import fs from "fs"; // Import the fs module for working with the file system
import LikeController from "../controller/LikeController"; // Import the LikeController

// Create a LikeRouter class that extends the BaseRoutes class
class LikeRouter extends BaseRoutes {
    public routes(): void {
        // Define routes for saving likes, getting post likes, and removing likes
        this.router.post("/", LikeController.saveLike); // Route for saving a like
        this.router.get("/:postId", LikeController.getPostLikes); // Route for getting post likes
        this.router.delete("/delete", LikeController.removeLike); // Route for removing a like
    }
}

export default new LikeRouter().router; // Export an instance of the LikeRouter class with defined routes
