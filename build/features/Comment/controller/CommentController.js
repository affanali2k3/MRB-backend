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
const CommentRepository_1 = __importDefault(require("../repository/CommentRepository"));
class CommentController {
    saveComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const commentId = yield CommentRepository_1.default.saveComment({ userEmail: data.userEmail, postId: data.postId, text: data.text });
                res.status(200).json({
                    message: 'Comment saved succesfully',
                    data: commentId
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot save Comment ${err}`
                });
            }
        });
    }
    getPostComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = parseInt(req.params.postId);
                const comments = yield CommentRepository_1.default.getPostComments({ postId: postId });
                res.status(200).json({
                    message: 'Got post Comments succesfully',
                    data: comments
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Cannot get post Comments ${err}`
                });
            }
        });
    }
}
exports.default = new CommentController;
