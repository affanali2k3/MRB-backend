import { Post } from "../../Post/model/PostModel"; // Import the Post model
import { Like } from "../model/LikeModel"; // Import the Like model

// Interface for the Like Repository
interface ILikeRepo {
  // Method to save a like
  saveLike({ postId, userId }: { userId: number; postId: number }): Promise<void>;
  // Method to get likes for a specific post
  getPostLikes({ postId }: { postId: number }): Promise<Like[]>;
  // Method to check if a user has liked a specific post and get the like ID
  getLike({ postId, userId }: { postId: number; userId: number }): Promise<number | null>;
  // Method to remove a like
  removeLike({ likeId, postId }: { likeId: number; postId: number }): Promise<void>;
}

// Implement the Like Repository interface
class LikeRepo implements ILikeRepo {
  // Method to save a like
  async saveLike({ postId, userId }: { userId: number; postId: number }): Promise<void> {
    try {
      // Create a new Like instance and set its properties
      const like = new Like();
      like.postId = postId;
      like.userId = userId;

      // Save the like
      await like.save();

      // Find the post related to the like
      const post = await Post.findOne({ where: { id: postId } });

      if (!post) return;

      // Increment the post's likes count
      post.likes = post.likes + 1;

      await post.save(); // Save the updated post
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to check if a user has liked a specific post and get the like ID
  async getLike({ postId, userId }: { postId: number; userId: number }) {
    try {
      // Find the like based on post ID and user email
      const like: Like | null = await Like.findOne({
        where: { postId: postId, userId: userId },
      });

      if (!like) return null;

      return like.id; // Return the like ID if found
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to remove a like
  async removeLike({ likeId, postId }: { likeId: number; postId: number }) {
    try {
      // Find the like to be removed
      const like: Like | null = await Like.findOne({ where: { id: likeId } });

      if (!like) throw new Error("Like not found");

      // Find the post related to the like
      const post = await Post.findOne({ where: { id: postId } });

      if (!post) return;

      // Decrement the post's likes count
      post.likes = post.likes - 1;

      await post.save(); // Save the updated post

      await like.destroy(); // Delete the like
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to get likes for a specific post
  async getPostLikes({ postId }: { postId: number }): Promise<Like[]> {
    try {
      // Find all likes for the specified post
      const likes: Like[] = await Like.findAll({ where: { postId: postId } });
      return likes; // Return the list of likes
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new LikeRepo(); // Export an instance of the LikeRepo class
