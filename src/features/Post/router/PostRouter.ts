import BaseRoutes from "../../../router/base/BaseRouter";
import PostController from "../controller/PostController";
import multer from "multer";
import fs from "fs";

// Configuration for storing uploaded images using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userEmail: string = req.body.userEmail;
        const uniqueFolderName: string = req.body.uniqueFolderName;
        const destinationPath = `./storage/${userEmail}/postImages/${uniqueFolderName}/`;

        // Create the directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 15);

        // Generate a unique filename for the uploaded image
        const uniqueFileName = `${timestamp}_${randomString}.jpg`;

        cb(null, uniqueFileName);
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

class PostRouter extends BaseRoutes {
    public routes(): void {
        // Route to save a new post with uploaded images
        this.router.post("/", upload.array('images'), PostController.savePost);
        // Route to get all posts for a specific user
        this.router.get("/:userEmail", PostController.getAllPosts);
        // Route to get a specific post image
        this.router.get("/:userEmail/:postName/:imageName", PostController.getPostImage);
    }
}

export default new PostRouter().router;
