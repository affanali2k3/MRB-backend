import BaseRoutes from "../../../router/base/BaseRouter";
import UserController from "../controller/UserController";
import multer from "multer";
import fs from "fs";
import UserMiddleware from "../middleware/UserMiddleware";
import validate from "../helper/validate";
import { getUserSchema } from "../schema/UserSchema";
import UserValidator from "../helper/validate";

// Configure multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId: number = req.body.id; // Get the value of 'email' from req.body

    const destinationPath = `./storage/${userId}/avatar`;

    // Create the destination directory if it doesn't exist
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

// Create a multer instance using the configured storage
const upload = multer({ storage });

// Define UserRoutes class
class UserRoutes extends BaseRoutes {
  public routes(): void {
    // Define routes and associate them with corresponding controller methods
    this.router.post("", UserController.create); // Create a new user
    this.router.patch("/update", upload.single("avatar"), UserController.update); // Update user with email
    this.router.get("/get-all", UserController.getAllUsers); // Get all users
    this.router.get("/get", UserController.getUser); // Get user by email
    this.router.get("/get/email", UserController.getUserByEmail); // Get user by email
    this.router.get("/avatar", UserController.getUserAvatar); // Get user avatar by userEmail
  }
}

// Export an instance of UserRoutes
export default new UserRoutes().router;
