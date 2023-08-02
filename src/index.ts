import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import UserRouter from "./features/UserProfile/router/UserRouter";
import UserAssociatesRouter from "./features/UserAssociates/router/UserAssociatesRouter";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome home");
        });
        this.app.use("/api/v1/user", UserRouter);
        this.app.use("/api/v1/associate", UserAssociatesRouter);
    }
}

const port: number = 8080;
const app = new App().app;

app.listen(port, () => {
    console.log("✅ Server started successfully!");
});