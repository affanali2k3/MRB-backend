import BaseRoutes from "../../../router/base/BaseRouter";
import UserController from "../controller/UserController"
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body);
        const userEmail = req.body.email; // Get the value of 'ssn' from req.body
        console.log(userEmail);
        const destinationPath = `./storage/${userEmail}/`;

        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        // You can define the filename logic here if needed
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });



class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("", UserController.create);
        this.router.patch("/:email", upload.single('avatar'), UserController.update)
        this.router.delete("/:email", UserController.delete)
        this.router.get("", UserController.getAllUsers)
        this.router.get("/:email", UserController.getUserByEmail)
        this.router.get("/avatar/:userEmail", UserController.getUserAvatar)
    }

}

export default new UserRoutes().router