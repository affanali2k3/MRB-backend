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
const LikeRepository_1 = __importDefault(require("../repository/LikeRepository"));
class LikeController {
    saveLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield LikeRepository_1.default.saveLike({ userEmail: data.userEmail, postId: data.postId });
                res.status(200).json({
                    message: 'Like saved succesfully'
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot save like ${err}`
                });
            }
        });
    }
    getPostLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = parseInt(req.params.postId);
                const likes = yield LikeRepository_1.default.getPostLikes({ postId: postId });
                res.status(200).json({
                    message: 'Got post likes succesfully',
                    data: likes
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot get post likes ${err}`
                });
            }
        });
    }
}
exports.default = new LikeController;
