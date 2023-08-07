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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = require("../../UserProfile/model/User");
class SearchRepo {
    searchUser({ userName }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.User.findAll({ where: { name: { [sequelize_1.Op.iLike]: `%${userName}%` } } });
                return users;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = new SearchRepo;
