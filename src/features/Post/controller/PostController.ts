import { Request, Response } from "express";
import PostRepo from "../repository/PostRepository"; // Import the PostRepo for interacting with posts
import { Post } from "../model/PostModel"; // Import the Post model
import path from "path"; // Import the path module for working with file paths
import LikeRepository from "../../Like/repository/LikeRepository"; // Import the LikeRepository for managing likes
import { User } from "../../UserProfile/model/User";

// Create a class to represent a Post with associated image information
class PostWithImages {
  constructor(
    postId: number,
    comments: number,
    posterName: string,
    likes: number,
    likeId: number | null,
    text: string,
    name: string,
    userId: number,
    createdAt: string,
    updatedAt: string,
    imagesName: string[]
  ) {
    (this.postId = postId), (this.likes = likes), (this.likeId = likeId);
    (this.text = text),
      (this.name = name),
      (this.userId = userId),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt),
      (this.imagesName = imagesName),
      (this.comments = comments),
      (this.posterName = posterName);
  }
  postId: number;
  comments: number;
  posterName: string;
  likes: number;
  likeId: number | null;
  text: string;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  imagesName: string[] | null;
}

export interface PostSaveData {
  userId: number;
  postText: string;
  uniquePostName: string;
  postType: string;
  madeReferralId: number;
  updatedProfileId: number;
  sharedLikedCommentedId: number;
}

export interface PostShareData {
  userId: number;
  postText: string;
  sharedLikedCommentedId: number;
}

// Create a PostController class for handling post-related operations
class PostController {
  async savePost(req: Request, res: Response) {
    try {
      console.log(req.files);
      console.log(req.body);
      // Retrieve post data from request body
      const postText: string = req.body.postText;
      const userId: number = req.body.userId;
      const uniquePostName: string = req.body.uniqueFolderName;

      let fileNames: string[] | null = null;

      console.log(req.files);

      // Extract filenames from uploaded files
      if (req.files !== undefined) {
        fileNames = [];
        (req.files as Array<Express.Multer.File>).map(function (file) {
          fileNames?.push(file.filename);
        });
      }

      // Save the post to the database
      await PostRepo.savePost({
        userId: userId,
        postText: postText,
        fileNames: fileNames,
        postName: uniquePostName,
      });

      res.status(200).json({
        message: "Post saved successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to save post ${err}`,
      });
    }
  }
  async sharePost(req: Request, res: Response) {
    try {
      const reqBody = req.body as PostShareData;

      await PostRepo.sharePost(reqBody);

      res.status(200).json({
        message: "Post shared successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to share post ${err}`,
      });
    }
  }
  async deletePost(req: Request, res: Response) {
    try {
      const postId: number = parseInt(req.params.postId);

      await PostRepo.deletePost({ postId: postId });

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to delete post ${err}`,
      });
    }
  }

  async getPostImage(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const postName: string = req.query.postName as string;
      const imageName: string = req.query.imageName as string;

      res.sendFile(path.join("/home/affan/Desktop/MRB/MRB-backend/storage", userId.toString(), "postImages", postName, imageName));
    } catch (err) {
      res.status(500).json({
        message: `Failed to get post image ${err}`,
      });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const userIdString: string = req.query.userId as string;
      const userId: number = parseInt(userIdString);

      const posts: Post[] = await PostRepo.getAllPosts({ userId: userId });
      const postsWithImages: PostWithImages[] = [];

      // Iterate through posts and retrieve associated image information
      for (const post of posts) {
        const user = post.get("User") as User;
        const postImages: string[] = await PostRepo.getImageNamesOfPost({
          postId: post.id,
        });
        const likeId: number | null = await LikeRepository.getLike({
          postId: post.id,
          userId: userId,
        });
        const postWithImages: PostWithImages = new PostWithImages(
          post.id,
          post.comments,
          user.name,
          post.likes,
          likeId,
          post.text,
          post.name,
          post.userId,
          post.createdAt,
          post.updatedAt,
          postImages
        );
        postsWithImages.push(postWithImages);
      }

      res.status(200).json({
        message: "Got posts successfully",
        data: postsWithImages,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to get posts ${err}`,
      });
    }
  }
}

export default new PostController(); // Export an instance of the PostController class
