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
const PostModel_1 = require("../model/PostModel");
class PostRepo {
    savePost({ userEmail, postText, imageFolderPath }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = new PostModel_1.Post();
                post.text = postText;
                post.userEmail = userEmail;
                post.imageFolderPath = imageFolderPath;
                yield post.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    getAllPosts({ userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield PostModel_1.Post.findAll({ where: { userEmail: userEmail } });
                return posts;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = new PostRepo;
