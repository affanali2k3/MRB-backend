"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./config/database"));
const UserRouter_1 = __importDefault(require("./features/UserProfile/router/UserRouter"));
const UserAssociatesRouter_1 = __importDefault(require("./features/UserAssociates/router/UserAssociatesRouter"));
const SearchRouter_1 = __importDefault(require("./features/Search/router/SearchRouter"));
const ChatRouter_1 = __importDefault(require("./features/Chat/router/ChatRouter"));
const PostRouter_1 = __importDefault(require("./features/Post/router/PostRouter"));
const path_1 = __importDefault(require("path"));
const LikeRouter_1 = __importDefault(require("./features/Like/router/LikeRouter"));
const CommentRouter_1 = __importDefault(require("./features/Comment/router/CommentRouter"));
const FeedRouter_1 = __importDefault(require("./features/Feed/router/FeedRouter"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server);
        this.databaseSync();
        this.plugins();
        this.routes();
        this.activeClientsOnSocket = new Map();
        this.setupSocketIO();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'storage')));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("welcome home");
        });
        this.app.use("/api/v1/user", UserRouter_1.default);
        this.app.use("/api/v1/associate", UserAssociatesRouter_1.default);
        this.app.use("/api/v1/search", SearchRouter_1.default);
        this.app.use("/api/v1/chat", ChatRouter_1.default);
        this.app.use("/api/v1/post", PostRouter_1.default);
        this.app.use("/api/v1/like", LikeRouter_1.default);
        this.app.use("/api/v1/comment", CommentRouter_1.default);
        this.app.use("/api/v1/feed", FeedRouter_1.default);
    }
    setupSocketIO() {
        this.io.on("connection", (socket) => {
            console.log("A user connected");
            this.activeClientsOnSocket.set(socket.id, '');
            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
            socket.on('user-connected', (email) => {
                this.activeClientsOnSocket.set(email, socket.id);
            });
            socket.on("message", ({ message, senderEmail, receiverEmail }) => __awaiter(this, void 0, void 0, function* () {
                console.log("Message received:", message);
                console.log("Sender email:", senderEmail);
                console.log("Receiver Email:", receiverEmail);
                // this.io.emit("chat message", msg);
            }));
        });
    }
}
const port = 8080;
const server = new App().server;
server.listen(port, () => {
    console.log("✅ Server started successfully!");
});
