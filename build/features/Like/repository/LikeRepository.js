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
const PostModel_1 = require("../../Post/model/PostModel");
const LikeModel_1 = require("../model/LikeModel");
class LikeRepo {
    saveLike({ postId, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const like = new LikeModel_1.Like();
                like.postId = postId;
                like.userEmail = userEmail;
                yield like.save();
                const post = yield PostModel_1.Post.findOne({ where: { id: postId } });
                if (!post)
                    return;
                post.likes = post.likes + 1;
                yield post.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    getLike({ postId, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield LikeModel_1.Like.findOne({ where: { postId: postId, userEmail: userEmail } });
                if (!like)
                    return null;
                return like.id;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    removeLike({ likeId, postId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield LikeModel_1.Like.findOne({ where: { id: likeId } });
                if (!like)
                    throw new Error('Like not found');
                const post = yield PostModel_1.Post.findOne({ where: { id: postId } });
                if (!post)
                    return;
                post.likes = post.likes - 1;
                yield post.save();
                yield like.destroy();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    getPostLikes({ postId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield LikeModel_1.Like.findAll({ where: { postId: postId } });
                return likes;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = new LikeRepo;
