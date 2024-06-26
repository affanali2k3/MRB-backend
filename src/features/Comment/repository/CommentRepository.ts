import { Comment } from "../model/CommentModel"; // Import the Comment model
import { Post } from "../../Post/model/PostModel";
import PostRepository from "../../Post/repository/PostRepository";

// Interface for the Comment Repository
interface ICommentRepo {
  // Method to save a comment
  saveComment({ postId, userId, text }: { userId: number; postId: number; text: string }): Promise<number>;

  // Method to get comments for a specific post
  getPostComments({ postId }: { postId: number }): Promise<Comment[]>;
}

// Implement the Comment Repository interface
class CommentRepo implements ICommentRepo {
  // Method to save a comment
  async saveComment({ postId, userId, text }: { userId: number; postId: number; text: string }): Promise<number> {
    try {
      const comment = new Comment();
      comment.postId = postId; // Set the post ID for the comment
      comment.userId = userId; // Set the user's email for the comment
      comment.text = text; // Set the text of the comment

      const savedComment = await comment.save(); // Save the comment in the database

      const post = await Post.findOne({ where: { id: postId } });

      if (!post) throw new Error("Post not found");

      // Increment the post's likes count
      // post.comments = post.comments + 1;

      await post.save(); // Save the updated post

      await PostRepository.createCommentedOnPost({ userId: userId, postId: postId, comment: text });

      return savedComment.id; // Return the ID of the saved comment
    } catch (err) {
      throw new Error(`${err}`); // Throw an error if saving the comment fails
    }
  }

  async deleteComment({ commentId, postId }: { commentId: number; postId: number }): Promise<void> {
    try {
      const comment: Comment | null = await Comment.findOne({ where: { id: commentId } });

      if (!comment) throw new Error("Comment not found");

      await comment.destroy();

      const post = await Post.findOne({ where: { id: postId } });

      if (!post) return;

      if (comment.postId !== postId) throw new Error("Comment post id does not match the real post id");

      post.comments = post.comments - 1;
    } catch (err) {
      throw new Error(`${err}`); // Throw an error if saving the comment fails
    }
  }

  // Method to get comments for a specific post
  async getPostComments({ postId }: { postId: number }): Promise<Comment[]> {
    try {
      const comments: Comment[] = await Comment.findAll({
        where: { postId: postId },
      }); // Retrieve comments for the specified post
      return comments; // Return the retrieved comments
    } catch (err) {
      throw new Error(`${err}`); // Throw an error if retrieving comments fails
    }
  }
}

export default new CommentRepo(); //
