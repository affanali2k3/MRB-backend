"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const ssnFolder = req.body.ssn; // Get the value of 'ssn' from req.body
        const destinationPath = `./storage/${ssnFolder}/`;
        if (!fs_1.default.existsSync(destinationPath)) {
            fs_1.default.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        // You can define the filename logic here if needed
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("", UserController_1.default.create);
        this.router.patch("/:email", upload.single('avatar'), UserController_1.default.update);
        this.router.delete("/:email", UserController_1.default.delete);
        this.router.get("", UserController_1.default.getAllUsers);
        this.router.get("/:email", UserController_1.default.getUserByEmail);
    }
}
exports.default = new UserRoutes().router;
