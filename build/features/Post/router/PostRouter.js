"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
const PostController_1 = __importDefault(require("../controller/PostController"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const userEmail = req.body.userEmail;
        const uniqueFolderName = req.body.uniqueFolderName;
        const destinationPath = `./storage/${userEmail}/postImages/${uniqueFolderName}/`;
        if (!fs_1.default.existsSync(destinationPath)) {
            fs_1.default.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 15);
        const uniqueFileName = `${timestamp}_${randomString}.jpg`;
        cb(null, uniqueFileName);
    },
});
const upload = (0, multer_1.default)({ storage });
class PostRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/", upload.array('images'), PostController_1.default.savePost); //
        this.router.get("/:userEmail", PostController_1.default.getAllPosts); //
    }
}
exports.default = new PostRouter().router;
