import { Request, Response } from "express";
import PostRepo from "../repository/PostRepository";
import { Post } from "../model/PostModel";
import path from "path";
import LikeRepository from "../../Like/repository/LikeRepository";

class PostWithImages {
    constructor(postId: string, likes: number, likeId: number | null, text: string, name: string, userEmail: string, createdAt: string, updatedAt: string, imagesName: string[]) {
        this.postId = postId, this.likes = likes, this.likeId = likeId; this.text = text, this.name = name
            , this.userEmail = userEmail, this.createdAt = createdAt, this.updatedAt = updatedAt, this.imagesName = imagesName
    }
    postId: string;
    likes: number;
    likeId: number | null;
    text: string;
    name: string;
    userEmail: string;
    createdAt: string;
    updatedAt: string;
    imagesName: string[] | null;
}
class PostController {
    async savePost(req: Request, res: Response) {
        try {
            const postText: string = req.body.postText;
            const userEmail: string = req.body.userEmail;
            let fileNames: string[] | null = null;


            if (req.files !== undefined) {
                fileNames = [];
                (req.files as Array<Express.Multer.File>).map(function (file) {
                    fileNames?.push(file.filename);
                })
            }

            const uniquePostName: string = req.body.uniqueFolderName;

            await PostRepo.savePost({ userEmail: userEmail, postText: postText, fileNames: fileNames, postName: uniquePostName });

            res.status(200).json({
                message: "Post saved succesfully",
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to save post ${err}`,
            });

        }
    }

    async getPostImage(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const postName: string = req.params.postName;
            const imageName: string = req.params.imageName;
            res.sendFile(path.join('C:/Users/Affan/Desktop/MRB/backend/storage/', userEmail, 'postImages', postName, imageName));
        } catch (err) {
            res.status(500).json({
                message: `Failed to get post image ${err}`
            }
            )
        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const posts: Post[] = await PostRepo.getAllPosts({ userEmail: userEmail });
            const postsWithImages: PostWithImages[] = [];

            for (const post of posts) {
                const postImages: string[] = await PostRepo.getImageNamesOfPost({ postId: post.id });
                const likeId: number | null = await LikeRepository.getLike({ postId: post.id, userEmail: userEmail });
                const postWithImages: PostWithImages = new PostWithImages(post.id.toString(), post.likes, likeId, post.text, post.name, post.userEmail, post.createdAt, post.updatedAt, postImages);
                postsWithImages.push(postWithImages);
            }

            res.status(200).json({
                message: "Got posts succesfully",
                data: postsWithImages
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to get posts ${err}`,
            });

        }
    }
}

export default new PostController;