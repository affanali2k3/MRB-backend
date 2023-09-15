import { Request, Response } from "express";
import { Post } from "../../Post/model/PostModel"; // Import the Post model
import FeedRepo from "../repository/FeedRepository"; // Import the FeedRepository
import PostRepository from "../../Post/repository/PostRepository"; // Import the PostRepository
import LikeRepository from "../../Like/repository/LikeRepository"; // Import the LikeRepository

// Class to represent a Post with associated images
class PostWithImages {
    constructor(postId: string, likes: number, likeId: number | null, text: string, name: string, userEmail: string, createdAt: string, updatedAt: string, imagesName: string[]) {
        this.postId = postId;
        this.likes = likes;
        this.likeId = likeId;
        this.text = text;
        this.name = name;
        this.userEmail = userEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imagesName = imagesName;
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

// Controller class for handling feed-related operations
class FeedController {
    // Method to get the feed for a specific user
    async getFeedForUser(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail;
            const page: number = parseInt(req.params.page);
            const postsPerPage: number = 3;

            const skipPosts: number = (page - 1) * postsPerPage;

            // Retrieve posts for the user's feed using the FeedRepo
            const posts: Post[] = await FeedRepo.getFeedForUser({ userEmail: userEmail, skipPosts: skipPosts, postsPerPage: postsPerPage });
            const postsWithImages: PostWithImages[] = [];

            // Loop through each post to gather additional details and images
            for (const post of posts) {
                // Retrieve image names of the post using the PostRepository
                const postImages: string[] = await PostRepository.getImageNamesOfPost({ postId: post.id });
                // Retrieve like information for the post using the LikeRepository
                const likeId: number | null = await LikeRepository.getLike({ postId: post.id, userId: post.userId });
                // Create a PostWithImages object with the gathered details
                const postWithImages: PostWithImages = new PostWithImages(
                    post.id.toString(), post.likes, likeId, post.text, post.name, post.userId, post.createdAt, post.updatedAt, postImages
                );
                postsWithImages.push(postWithImages);
            }

            // Respond with the posts with associated images
            res.status(200).json({
                message: "Got feed successfully",
                data: postsWithImages
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot get feed ${err}`
            });
        }
    }
}

export default new FeedController; // Export an instance of the FeedController class
