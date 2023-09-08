import { PostImages } from "../model/PostImages";
import { Post } from "../model/PostModel";

// Interface that defines the methods of the PostRepo class
interface IPostRepo {
    savePost({ userEmail, postText, postName }: { userEmail: string, postText: string, postName: string | null }): Promise<void>;
    getAllPosts({ userEmail }: { userEmail: string }): Promise<Post[]>;
    getImageNamesOfPost({ postId }: { postId: number }): Promise<string[]>;
}

class PostRepo implements IPostRepo {
    // Method to save a new post with images
    async savePost({ userEmail, postText, postName, fileNames }: { userEmail: string, postText: string, fileNames: string[] | null, postName: string }): Promise<void> {
        try {
            const post = new Post();

            // Set attributes of the new post
            post.text = postText;
            post.userEmail = userEmail;
            post.name = postName;
            post.likes = 0;

            // Save the post to the database
            const newPost = await post.save();

            // If there are image file names provided, save them as PostImages
            if (fileNames === null) return;


            for (const fileName of fileNames) {
                const postImage = new PostImages();
                postImage.postId = newPost.id;
                postImage.image_name = fileName;
                await postImage.save();
            }
        

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    // Method to retrieve all posts for a specific user
    async getAllPosts({ userEmail }: { userEmail: string }) {
        try {
            const posts: Post[] = await Post.findAll({ where: { userEmail: userEmail } });
            return posts;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    // Method to retrieve image names of a specific post
    async getImageNamesOfPost({ postId }: { postId: number }) {
        try {
            const imageNames: string[] = (await PostImages.findAll
                ({ where: { postId: postId }, attributes: ['image_name'] },)).map(postImage => postImage.image_name);
            return imageNames;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new PostRepo;
