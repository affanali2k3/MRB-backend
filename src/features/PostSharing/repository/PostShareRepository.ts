import { PostShare } from "../model/PostSharingModel";


// Interface that defines the methods of the PostShareRepo class
interface IPostShareRepo {
  // Method to retrieve all posts shared by a specific user
  getAllPostsbyUser({
    user_id,
  }: {
    user_id: string;
  }): Promise<PostShare[]>;
}

class PostShareRepo implements IPostShareRepo {
  // Method to retrieve all posts shared by a specific user
  async getAllPostsbyUser({
    user_id,
  }: {
    user_id: string;
  }): Promise<PostShare[]> {
    try {
      // Retrieve all post shares associated with the provided user's email
      const posts: PostShare[] = await PostShare.findAll({
        where: { user_id: user_id },
      });
      return posts;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Method to save a new post share record
  async savePostShare({
    user_id,
    post_id,
  }: {
    user_id: string;
    post_id: number;
  }): Promise<void> {
    try {
      console.log(
        "The user entered is : ",
        user_id,
        " and the post id is : ",
        post_id
      );

      // Create a new PostShare instance
      const postShare = new PostShare();
      postShare.userId = user_id;
      postShare.postId = post_id;

      // Save the new PostShare record to the database
      await postShare.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new PostShareRepo();
