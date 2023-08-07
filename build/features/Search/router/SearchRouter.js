"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchController_1 = __importDefault(require("../controller/SearchController"));
const BaseRouter_1 = __importDefault(require("../../../router/base/BaseRouter"));
class SearchRouter extends BaseRouter_1.default {
    routes() {
        this.router.get("/name/:userName", SearchController_1.default.searchUser);
    }
}
exports.default = new SearchRouter().router;
