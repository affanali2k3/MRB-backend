import BaseRoutes from "../../../router/base/BaseRouter";
import PostController from "../controller/PostController";
import multer from "multer";
import fs from "fs";
import PostMiddleware from "../middleware/PostMiddleware";

// Configuration for storing uploaded images using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId: number = req.body.userId;
    const uniqueFolderName = req.body.uniqueFolderName;
    console.log(userId);
    const destinationPath = `./storage/${userId}/postImages/${uniqueFolderName}/`;
    console.log(destinationPath);

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
    this.router.post("/create", upload.array("images"), PostController.savePost);
    this.router.post("/delete", PostController.savePost);
    this.router.post("/share", PostController.sharePost); //
    // this.router.get("/:userEmail", PostController.getAllPosts);//
    this.router.get("/get-all", PostController.getAllPosts); //
    this.router.get("/post-image", PostController.getPostImage); //
  }
}

export default new PostRouter().router;
