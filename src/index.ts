import express, { Application, Request, Response } from "express";
import http from 'http';
import { Server, Socket } from 'socket.io';
import Database from "./config/database";
import UserRouter from "./features/UserProfile/router/UserRouter";
import UserAssociatesRouter from "./features/UserAssociates/router/UserAssociatesRouter";
import SearchRouter from "./features/Search/router/SearchRouter";
import { Message } from "./features/Chat/model/MessageModel";
import ChatController from "./features/Chat/controller/ChatController";
import ChatRouter from "./features/Chat/router/ChatRouter";
import PostRouter from "./features/Post/router/PostRouter";

class App {
    public app: Application;
    public server: http.Server;
    public io: Server;
    public activeClientsOnSocket: Map<string, string>;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.databaseSync();
        this.plugins();
        this.routes();
        this.activeClientsOnSocket = new Map<string, string>()
        this.setupSocketIO();

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
        this.app.use("/api/v1/search", SearchRouter);
        this.app.use("/api/v1/chat", ChatRouter);
        this.app.use("/api/v1/post", PostRouter);
    }

    protected setupSocketIO(): void {
        this.io.on("connection", (socket: Socket) => {
            console.log("A user connected");
            this.activeClientsOnSocket.set(socket.id, '');

            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });

            socket.on('user-connected', (email: string) => {
                this.activeClientsOnSocket.set(email, socket.id);
            })

            socket.on("message", async ({ message, senderEmail, receiverEmail }: { message: string, senderEmail: string, receiverEmail: string }) => {
                console.log("Message received:", message);
                console.log("Sender email:", senderEmail);
                console.log("Receiver Email:", receiverEmail);
                // this.io.emit("chat message", msg);
            });
        });
    }
}

const port: number = 8080;
const server = new App().server;


server.listen(port, () => {
    console.log("✅ Server started successfully!");
});