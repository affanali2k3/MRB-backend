"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchRepo_1 = __importDefault(require("../repository/SearchRepo"));
class SearchController {
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userName = req.params.userName;
                const users = yield SearchRepo_1.default.searchUser({ userName: userName });
                res.status(200).json({
                    message: "Users searched succesfully",
                    data: users
                });
            }
            catch (err) {
                res.status(200).json({
                    message: `Failed to search users ${err}`,
                });
            }
        });
    }
}
exports.default = new SearchController;
