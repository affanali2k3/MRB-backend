"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
require("reflect-metadata");
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../serviceAccountKey.json");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        // this.connectFirebaseStorage();
        this.plugins();
        this.routes();
    }
    connectFirebaseStorage() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount)
        });
        this.app.locals.bucket = firebase_admin_1.default.storage().bucket("");
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send("Welcome home");
        });
        this.app.use("/api/v1/user", UserRouter_1.default);
    }
}
const port = 8080;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
exports.default = app;
