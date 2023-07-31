import BaseRoutes from "./base/BaseRouter";
import UserController from "../controller/UserController"
import validate from "../helper/validate";
import multer from "multer";
import fs from "fs";
import { createUserSchema, updateUserSchema } from "../schema/UserSchema";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ssnFolder = req.body.ssn; // Get the value of 'ssn' from req.body
        const destinationPath = `./storage/${ssnFolder}/`;

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
    }

}

export default new UserRoutes().router