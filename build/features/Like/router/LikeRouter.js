"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
const LikeController_1 = __importDefault(require("../controller/LikeController"));
class LikeRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/", LikeController_1.default.saveLike);
        this.router.get("/:postId", LikeController_1.default.getPostLikes);
        this.router.delete("/delete", LikeController_1.default.removeLike);
    }
}
exports.default = new LikeRouter().router;
