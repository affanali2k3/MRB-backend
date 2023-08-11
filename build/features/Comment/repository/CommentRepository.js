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
const CommentModel_1 = require("../model/CommentModel");
class CommentRepo {
    saveComment({ postId, userEmail, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = new CommentModel_1.Comment();
                comment.postId = postId;
                comment.userEmail = userEmail;
                comment.text = text;
                yield comment.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    getPostComments({ postId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield CommentModel_1.Comment.findAll({ where: { postId: postId } });
                return comments;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = new CommentRepo;
