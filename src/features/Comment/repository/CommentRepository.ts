import { Comment } from "../model/CommentModel"; // Import the Comment model

// Interface for the Comment Repository
interface ICommentRepo {
    // Method to save a comment
    saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<number>;

    // Method to get comments for a specific post
    getPostComments({ postId }: { postId: number }): Promise<Comment[]>;
}

// Implement the Comment Repository interface
class CommentRepo implements ICommentRepo {
    // Method to save a comment
    async saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<number> {
        try {
            const comment = new Comment();
            comment.postId = postId; // Set the post ID for the comment
            comment.userEmail = userEmail; // Set the user's email for the comment
            comment.text = text; // Set the text of the comment

            const savedComment = await comment.save(); // Save the comment in the database

            return savedComment.id; // Return the ID of the saved comment
        } catch (err) {
            throw new Error(`${err}`); // Throw an error if saving the comment fails
        }
    }

    // Method to get comments for a specific post
    async getPostComments({ postId }: { postId: number }): Promise<Comment[]> {
        try {
            const comments: Comment[] = await Comment.findAll({ where: { postId: postId } }); // Retrieve comments for the specified post
            return comments; // Return the retrieved comments
        } catch (err) {
            throw new Error(`${err}`); // Throw an error if retrieving comments fails
        }
    }
}

export default new CommentRepo; //
