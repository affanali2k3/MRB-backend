import { Request, Response } from "express"; // Import necessary modules
import LikeRepository from "../repository/LikeRepository"; // Import the LikeRepository
import { Like } from "../model/LikeModel"; // Import the Like model

// Interface to define the structure of like-related data
interface LikeData {
    userId: number;
    postId: number;
    likeId: number;
}

// Controller class for handling like-related operations
class LikeController {
    // Method to save a like
    async saveLike(req: Request, res: Response) {
        try {
            const data: LikeData = req.body; // Extract like-related data from the request body
            await LikeRepository.saveLike({ userId: data.userId, postId: data.postId }); // Call the LikeRepository to save the like

            // Respond with success message
            res.status(200).json({
                message: 'Like saved successfully'
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Cannot save like ${err}`
            });
        }
    }

    // Method to remove a like
    async removeLike(req: Request, res: Response) {
        try {
            const data: LikeData = req.body; // Extract like-related data from the request body
            await LikeRepository.removeLike({ likeId: data.likeId, postId: data.postId }); // Call the LikeRepository to remove the like

            // Respond with success message
            res.status(200).json({
                message: 'Like deleted successfully'
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Cannot delete like ${err}`
            });
        }
    }

    // Method to get likes for a specific post
    async getPostLikes(req: Request, res: Response) {
        try {
            const postId: number = parseInt(req.params.postId); // Extract the post ID from the request parameters
            const likes: Like[] = await LikeRepository.getPostLikes({ postId: postId }); // Call the LikeRepository to get likes for the post

            // Respond with post likes
            res.status(200).json({
                message: 'Got post likes successfully',
                data: likes
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Cannot get post likes ${err}`
            });
        }
    }
}

export default new LikeController; // Export an instance of the LikeController class
