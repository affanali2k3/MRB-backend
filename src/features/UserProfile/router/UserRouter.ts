<<<<<<< HEAD
import BaseRoutes from "../../../router/base/BaseRouter";
import UserController from "../controller/UserController";
import multer from "multer";
import fs from "fs";

// Configure multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body);
        const userEmail = req.body.email; // Get the value of 'email' from req.body
        console.log(userEmail);
        const destinationPath = `./storage/${userEmail}/`;

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
        this.router.patch("/:email", upload.single('avatar'), UserController.update); // Update user with email
        this.router.delete("/:email", UserController.delete); // Delete user with email
        this.router.get("", UserController.getAllUsers); // Get all users
        this.router.get("/:email", UserController.getUserByEmail); // Get user by email
        this.router.get("/avatar/:userEmail", UserController.getUserAvatar); // Get user avatar by userEmail
    }
}

// Export an instance of UserRoutes
export default new UserRoutes().router;
=======
import BaseRoutes from "../../../router/base/BaseRouter";
import UserController from "../controller/UserController";
import multer from "multer";
import fs from "fs";

// Configure multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body);
        const userEmail = req.body.email; // Get the value of 'email' from req.body
        console.log(userEmail);
        const destinationPath = `./storage/${userEmail}/`;

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
        this.router.patch("/:email", upload.single('avatar'), UserController.update); // Update user with email
        this.router.delete("/:email", UserController.delete); // Delete user with email
        this.router.get("/get-all", UserController.getAllUsers); // Get all users
        this.router.get("/get", UserController.getUser); // Get user by email
        this.router.get("/get/email", UserController.getUserByEmail); // Get user by email
        this.router.get("/avatar/:userEmail", UserController.getUserAvatar); // Get user avatar by userEmail
    }
}

// Export an instance of UserRoutes
export default new UserRoutes().router;
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
