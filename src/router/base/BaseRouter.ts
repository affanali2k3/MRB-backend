import { Router } from "express";
import IRouter from "./RouterInterface";

// Abstract class providing a base structure for defining routes
abstract class BaseRoutes implements IRouter {
    public router: Router;

    constructor() {
        // Initialize the Express Router
        this.router = Router();

        // Call the abstract routes() method to define routes
        this.routes();
    }

    // Abstract method that should be implemented by subclasses to define routes
    abstract routes(): void;
}

// Export the BaseRoutes class
export default BaseRoutes;
