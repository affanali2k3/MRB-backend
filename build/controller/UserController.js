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
const User_1 = require("../models/User");
const UserRepo_1 = require("../repository/UserRepo");
const fs_1 = __importDefault(require("fs"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User_1.User();
                const { email } = req.body;
                Object.assign(newUser, { email });
                yield new UserRepo_1.UserRepo().create(newUser.dataValues);
                res.status(200).json({
                    message: "User created successfully"
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot create user ${err}`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UserRepo_1.UserRepo().delete(req.body.userSsn);
                res.status(200).json({
                    message: "User deleted successfully"
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Cannot delete user"
                });
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userBucket;
                if (req.file !== undefined) {
                    userBucket = `./storage/${req.body.ssn}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
                }
                const updatedUser = new User_1.User();
                const { email, ssn, phone, occupation, name, gender, licence } = req.body;
                Object.assign(updatedUser, { email, ssn, phone, occupation, photo: userBucket, name, gender, licence });
                yield new UserRepo_1.UserRepo().update(updatedUser);
                res.status(200).json({
                    message: "User updated successfully"
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot update user because ${err}`
                });
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const user = yield new UserRepo_1.UserRepo().getByEmail(req.params.email);
                let file;
                try {
                    file = fs_1.default.readFileSync(user.photo);
                }
                catch (_a) { }
                res.status(200).json({
                    message: "Got user successfully",
                    data: user,
                    photo: file === undefined ? null : file.toString('base64')
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot get user ${err}`
                });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield new UserRepo_1.UserRepo().getAll();
                res.status(200).json({
                    message: "Got all users successfully",
                    data: users
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Cannot get users"
                });
            }
        });
    }
}
exports.default = new UserController;
