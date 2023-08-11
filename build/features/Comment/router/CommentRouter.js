"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
const CommentController_1 = __importDefault(require("../controller/CommentController"));
class CommentRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/", CommentController_1.default.saveComment);
        this.router.get("/:postId", CommentController_1.default.getPostComments);
    }
}
exports.default = new CommentRouter().router;
