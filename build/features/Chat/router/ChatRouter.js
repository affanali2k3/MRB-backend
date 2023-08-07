"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
const ChatController_1 = __importDefault(require("../controller/ChatController"));
class ChatRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/save", ChatController_1.default.saveMessage);
        this.router.post("/getAll", ChatController_1.default.getAllMessages);
    }
}
exports.default = new ChatRouter().router;
