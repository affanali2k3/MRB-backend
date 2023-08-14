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
const PostRepository_1 = __importDefault(require("../repository/PostRepository"));
const path_1 = __importDefault(require("path"));
const LikeRepository_1 = __importDefault(require("../../Like/repository/LikeRepository"));
class PostWithImages {
    constructor(postId, likes, likeId, text, name, userEmail, createdAt, updatedAt, imagesName) {
        this.postId = postId, this.likes = likes, this.likeId = likeId;
        this.text = text, this.name = name
            , this.userEmail = userEmail, this.createdAt = createdAt, this.updatedAt = updatedAt, this.imagesName = imagesName;
    }
}
class PostController {
    savePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postText = req.body.postText;
                const userEmail = req.body.userEmail;
                let fileNames = null;
                if (req.files !== undefined) {
                    fileNames = [];
                    req.files.map(function (file) {
                        fileNames === null || fileNames === void 0 ? void 0 : fileNames.push(file.filename);
                    });
                }
                const uniquePostName = req.body.uniqueFolderName;
                yield PostRepository_1.default.savePost({ userEmail: userEmail, postText: postText, fileNames: fileNames, postName: uniquePostName });
                res.status(200).json({
                    message: "Post saved succesfully",
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Failed to save post ${err}`,
                });
            }
        });
    }
    getPostImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEmail = req.params.userEmail;
                const postName = req.params.postName;
                const imageName = req.params.imageName;
                res.sendFile(path_1.default.join('C:/Users/Affan/Desktop/MRB/backend/storage/', userEmail, 'postImages', postName, imageName));
            }
            catch (err) {
                res.status(500).json({
                    message: `Failed to get post image ${err}`
                });
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEmail = req.params.userEmail;
                const posts = yield PostRepository_1.default.getAllPosts({ userEmail: userEmail });
                const postsWithImages = [];
                for (const post of posts) {
                    const postImages = yield PostRepository_1.default.getImageNamesOfPost({ postId: post.id });
                    const likeId = yield LikeRepository_1.default.getLike({ postId: post.id, userEmail: userEmail });
                    const postWithImages = new PostWithImages(post.id.toString(), post.likes, likeId, post.text, post.name, post.userEmail, post.createdAt, post.updatedAt, postImages);
                    postsWithImages.push(postWithImages);
                }
                res.status(200).json({
                    message: "Got posts succesfully",
                    data: postsWithImages
                });
            }
            catch (err) {
                res.status(500).json({
                    message: `Failed to get posts ${err}`,
                });
            }
        });
    }
}
exports.default = new PostController;
