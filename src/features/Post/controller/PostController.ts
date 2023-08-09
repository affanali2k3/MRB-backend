import { Request, Response } from "express";
import PostRepo from "../repository/PostRepository";
import { Post } from "../model/PostModel";
import path from "path";
import fs from "fs";

class PostData {
    constructor(text: string, userEmail: string, createdAt: string, updatedAt: string) {
        this.text = text
            , this.userEmail = userEmail, this.createdAt = createdAt, this.updatedAt = updatedAt, this.images = null
    }
    text: string;
    userEmail: string;
    createdAt: string;
    updatedAt: string;
    images: Buffer[] | null;
}
class PostController {
    async savePost(req: Request, res: Response) {
        try {
            const postText: string = req.body.postText;
            const userEmail: string = req.body.userEmail;

            let uniqueFolderName: string = req.body.uniqueFolderName;
            let imageFolderPath: string | null = `./storage/${userEmail}/postImages/${uniqueFolderName}/`;;

            if (req.files === null || req.files?.length === 0) { imageFolderPath = null }

            await PostRepo.savePost({ userEmail: userEmail, postText: postText, imageFolderPath: imageFolderPath });

            res.status(200).json({
                message: "Post saved succesfully",
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to save post ${err}`,
            });

        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const posts: Post[] = await PostRepo.getAllPosts({ userEmail: userEmail });

            const postsToSend: PostData[] = [];


            for (const post of posts) {
                const newPost = new PostData(post.text, post.userEmail, post.createdAt, post.updatedAt);
                if (post.imageFolderPath !== null) {
                    newPost.images = [];
                    const files = fs.readdirSync(post.imageFolderPath);
                    for (const file of files) {
                        const fileData: Buffer = fs.readFileSync(path.join(post.imageFolderPath, file));
                        newPost.images.push(fileData);
                    }
                }
                postsToSend.push(newPost);
            }

            res.status(200).json({
                message: "Got posts succesfully",
                data: postsToSend
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to get posts ${err}`,
            });

        }
    }
}

export default new PostController;