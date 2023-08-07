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
        this.router.patch("/accept", UserAssociatesController_1.default.acceptRequest);
        this.router.patch("/reject", UserAssociatesController_1.default.declineRequest);
        this.router.delete("/cancel", UserAssociatesController_1.default.cancelRequest);
        this.router.get("/getAll/:userEmail", UserAssociatesController_1.default.getAllAssociates);
        this.router.delete("/remove", UserAssociatesController_1.default.removeAssociate);
        this.router.post("/status", UserAssociatesController_1.default.checkRequestStatusWithUser);
    }
}
exports.default = new UserAssociatesRouter().router;
