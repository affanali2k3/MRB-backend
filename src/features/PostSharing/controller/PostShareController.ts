import { Request, Response } from "express";
import PostShareRepo from "../repository/PostShareRepository";
import { PostShare } from "../model/PostSharingModel";

class PostShareController {
  // Handles sharing a post by a user
  async sharePost(req: Request, res: Response) {
    const userEmail: string = req.params.userEmail;
    const postId: number = parseInt(req.params.postId);

    try {
      // Save the shared post in the database using the repository method
      await PostShareRepo.savePostShare({
        user_email: userEmail,
        post_id: postId,
      });

      // Respond with a success message
      res.status(200).json({
        message: "Post shared successfully",
      });
    } catch (err) {
      // If there's an error, respond with an error message
      res.status(500).json({
        message: `Cannot share Post ${err}`,
      });
    }
  }

  // Retrieves all posts shared by a specific user
  async getPostSharedByUser(req: Request, res: Response) {
    const userEmail: string = req.params.userEmail;

    try {
      // Retrieve all posts shared by the user from the database using the repository method
      const postShared: PostShare[] = await PostShareRepo.getAllPostsbyUser({
        user_email: userEmail,
      });

      // Respond with the retrieved posts
      res.status(200).json({
        message: "Post retrieved successfully",
        postShared,
      });
    } catch (err) {
      // If there's an error, respond with an error message
      res.status(500).json({
        message: `Cannot retrieve Post ${err}`,
      });
    }
  }
}

export default new PostShareController();
