import BaseRoutes from "../../../router/base/BaseRouter";
import PostController from "../controller/PostController";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userEmail: string = req.body.userEmail;
        const uniqueFolderName: string = req.body.uniqueFolderName;
        const destinationPath = `./storage/${userEmail}/postImages/${uniqueFolderName}/`;

        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 15);

        const uniqueFileName = `${timestamp}_${randomString}.jpg`;

        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage });



class PostRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/", upload.array('images'), PostController.savePost);//
        this.router.get("/:userEmail", PostController.getAllPosts);//
        this.router.get("/:userEmail/:postName/:imageName", PostController.getPostImage);//
    }
}

export default new PostRouter().router