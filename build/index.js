"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const UserRouter_1 = __importDefault(require("./features/UserProfile/router/UserRouter"));
const UserAssociatesRouter_1 = __importDefault(require("./features/UserAssociates/router/UserAssociatesRouter"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
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
    }
}
const port = 8080;
const app = new App().app;
app.listen(port, () => {
    console.log("✅ Server started successfully!");
});
