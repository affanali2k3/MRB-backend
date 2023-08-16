import { Request, Response } from "express"
import { Post } from "../../Post/model/PostModel"
import FeedRepo from "../repository/FeedRepository"
import PostRepository from "../../Post/repository/PostRepository";
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


class FeedController {
    async getFeedForUser(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const page: number = parseInt(req.params.page);
            const postsPerPage: number = 2;

            const skipPosts: number = (page - 1) * postsPerPage;

            const posts: Post[] = await FeedRepo.getFeedForUser({ userEmail: userEmail, skipPosts: skipPosts, postsPerPage: postsPerPage });
            const postsWithImages: PostWithImages[] = [];


            for (const post of posts) {
                const postImages: string[] = await PostRepository.getImageNamesOfPost({ postId: post.id });
                const likeId: number | null = await LikeRepository.getLike({ postId: post.id, userEmail: userEmail });
                const postWithImages: PostWithImages = new PostWithImages(post.id.toString(), post.likes, likeId, post.text, post.name, post.userEmail, post.createdAt, post.updatedAt, postImages);
                postsWithImages.push(postWithImages);
            }

            res.status(200).json({
                message: "Got feed succesfully",
                data: postsWithImages
            })
        } catch (err) {
            res.status(500).json({
                message: `Cannot get feed ${err}`
            })
        }
    }
}

export default new FeedController;