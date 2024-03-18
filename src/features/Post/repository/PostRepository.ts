import { User } from "../../UserProfile/model/User";
import { PostShareData } from "../controller/PostController";
import { PostImages } from "../model/PostImages";
import { Post, PostTypes } from "../model/PostModel";

// Interface that defines the methods of the PostRepo class
interface IPostRepo {
  savePost({ userId, postText, postName }: { userId: number; postText: string; postName: string | null }): Promise<void>;
  getAllPosts({ userId }: { userId: number }): Promise<Post[]>;
  getImageNamesOfPost({ postId }: { postId: number }): Promise<string[]>;
}

class PostRepo implements IPostRepo {
  // Method to save a new post with images
  async savePost({
    userId,
    postText,
    postName,
    fileNames,
  }: {
    userId: number;
    postText: string;
    fileNames: string[] | null;
    postName: string;
  }): Promise<void> {
    try {
      const post = new Post();

      // Set attributes of the new post
      post.text = postText;
      post.userId = userId;
      post.name = postName;
      post.type = PostTypes.DEFAULT;

      // Save the post to the database
      const newPost = await post.save();

      // If there are image file names provided, save them as PostImages
      if (fileNames === null) return;

      for (const fileName of fileNames) {
        console.log(fileName);
        const postImage = new PostImages();
        postImage.postId = newPost.id;
        postImage.image_name = fileName;
        await postImage.save();
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async sharePost(data: PostShareData): Promise<void> {
    try {
      const post = new Post();

      post.text = data.postText;
      post.userId = data.userId;
      post.sharedLikedCommentedId = data.sharedLikedCommentedId;
      post.type = PostTypes.SHARED_POST;

      await post.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async createMadeReferralPost({ userId, referralId }: { userId: number; referralId: number }): Promise<void> {
    try {
      const post = new Post();

      post.userId = userId;
      post.madeReferralId = referralId;
      post.type = PostTypes.MADE_REFERRAL;

      await post.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async createUpdatedProfilePost({ userId }: { userId: number }): Promise<void> {
    try {
      const post = new Post();

      post.userId = userId;
      post.type = PostTypes.UPDATED_PROFILE;

      await post.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async createLikedPost({ userId, postId }: { userId: number; postId: number }): Promise<void> {
    try {
      const post = new Post();

      post.userId = userId;
      post.sharedLikedCommentedId = postId;
      post.type = PostTypes.LIKED_POST;

      await post.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async createCommentedOnPost({ userId, postId, comment }: { userId: number; postId: number; comment: string }): Promise<void> {
    try {
      const post = new Post();

      post.userId = userId;
      post.text = comment;
      post.sharedLikedCommentedId = postId;
      post.type = PostTypes.COMMENTED_ON_POST;

      await post.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to retrieve all posts for a specific user
  async getAllPosts({ userId }: { userId: number }) {
    try {
      const posts: Post[] = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
          },
        ],
      });
      return posts;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to retrieve image names of a specific post
  async getImageNamesOfPost({ postId }: { postId: number }) {
    try {
      const imageNames: string[] = (
        await PostImages.findAll({
          where: { postId: postId },
          attributes: ["image_name"],
        })
      ).map((postImage) => postImage.image_name);
      return imageNames;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async deletePost({ postId }: { postId: number }) {
    try {
      const post: Post | null = await Post.findOne({ where: { id: postId } });

      if (!post) throw new Error("Post does not exist");

      await post.destroy();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new PostRepo();
