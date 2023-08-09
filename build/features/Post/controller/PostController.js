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
const fs_1 = __importDefault(require("fs"));
class PostData {
    constructor(text, userEmail, createdAt, updatedAt) {
        this.text = text
            , this.userEmail = userEmail, this.createdAt = createdAt, this.updatedAt = updatedAt, this.images = null;
    }
}
class PostController {
    savePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postText = req.body.postText;
                const userEmail = req.body.userEmail;
                let uniqueFolderName = req.body.uniqueFolderName;
                let imageFolderPath = `./storage/${userEmail}/postImages/${uniqueFolderName}/`;
                ;
                if (req.files === null || ((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    imageFolderPath = null;
                }
                yield PostRepository_1.default.savePost({ userEmail: userEmail, postText: postText, imageFolderPath: imageFolderPath });
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
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEmail = req.params.userEmail;
                const posts = yield PostRepository_1.default.getAllPosts({ userEmail: userEmail });
                const postsToSend = [];
                for (const post of posts) {
                    const newPost = new PostData(post.text, post.userEmail, post.createdAt, post.updatedAt);
                    if (post.imageFolderPath !== null) {
                        newPost.images = [];
                        const files = fs_1.default.readdirSync(post.imageFolderPath);
                        for (const file of files) {
                            const fileData = fs_1.default.readFileSync(path_1.default.join(post.imageFolderPath, file));
                            newPost.images.push(fileData);
                        }
                    }
                    postsToSend.push(newPost);
                }
                res.status(200).json({
                    message: "Got posts succesfully",
                    data: postsToSend
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
