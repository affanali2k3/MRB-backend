import { Request, Response } from "express";
import CommentRepository from "../repository/CommentRepository"; // Import the CommentRepository
import { Comment } from "../model/CommentModel"; // Import the Comment model
import { Post } from "../../Post/model/PostModel";

// Interface to represent data required for saving a comment
interface CommentData {
  userId: number;
  postId: number;
  text: string;
}

// Controller class for handling comment-related operations
class CommentController {
  // Method to save a comment
  async saveComment(req: Request, res: Response) {
    try {
      const data: CommentData = req.body; // Extract comment data from the request body
      const commentId: number = await CommentRepository.saveComment({
        userId: data.userId,
        postId: data.postId,
        text: data.text,
      }); // Call the CommentRepository method to save the comment

      const post: Post | null = await Post.findOne({
        where: { id: data.postId },
      });

      if (!post) throw new Error("Post does not exit");

      post.comments = post.comments + 1;

      await post.save();

      res.status(200).json({
        message: "Comment saved successfully",
        data: commentId, // Respond with the saved comment's ID
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot save Comment ${err}`,
      });
    }
  }
  async deleteComment(req: Request, res: Response) {
    try {
      const commentId: number = parseInt(req.query.commentId as string);
      const postId: number = parseInt(req.query.postId as string);

      await CommentRepository.deleteComment({
        commentId: commentId,
        postId: postId,
      });

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to delete Comment ${err}`,
      });
    }
  }

  // Method to get comments for a specific post
  async getPostComments(req: Request, res: Response) {
    try {
      const postId: number = parseInt(req.params.postId); // Extract the post ID from the URL parameter
      const comments: Comment[] = await CommentRepository.getPostComments({
        postId: postId,
      }); // Call the CommentRepository method to get post comments

      res.status(200).json({
        message: "Got post Comments successfully",
        data: comments, // Respond with the retrieved comments
      });
    } catch (err) {
      res.status(500).json({
        message: `Cannot get post Comments ${err}`,
      });
    }
  }
}

export default new CommentController(); // Export an instance of the CommentController class
