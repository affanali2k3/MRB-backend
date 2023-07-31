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
exports.UserRepo = void 0;
const User_1 = require("../models/User");
class UserRepo {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.User.create(Object.assign({}, user));
            }
            catch (err) {
                throw new Error(`Failed to create user. ${err}`);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.User.findOne({
                    where: {
                        email: user.email
                    }
                });
                if (!updatedUser)
                    throw new Error("User not found");
                updatedUser.email = user.email;
                updatedUser.ssn = user.ssn;
                updatedUser.name = user.name;
                updatedUser.licence = user.licence;
                updatedUser.photo = user.photo;
                updatedUser.occupation = user.occupation;
                updatedUser.gender = user.gender;
                updatedUser.save();
            }
            catch (err) {
                throw new Error(`Failed to update user. ${err}`);
            }
        });
    }
    delete(userSsn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({
                    where: {
                        ssn: userSsn
                    }
                });
                if (!user)
                    throw new Error("User not found");
                yield user.destroy();
            }
            catch (err) {
                throw new Error("Failed to create user.");
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({
                    where: {
                        email: email
                    }
                });
                if (!user)
                    throw new Error("User not found");
                return user;
            }
            catch (err) {
                throw new Error(`Failed to get user. ${err}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.User.findAll();
                return users;
            }
            catch (err) {
                throw new Error("Failed to create user.");
            }
        });
    }
}
exports.UserRepo = UserRepo;
