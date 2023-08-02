"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAssociatesController_1 = __importDefault(require("../controller/UserAssociatesController"));
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
class UserAssociatesRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/send", UserAssociatesController_1.default.sendRequest);
        this.router.post("/accept", UserAssociatesController_1.default.acceptRequest);
    }
}
exports.default = new UserAssociatesRouter().router;
