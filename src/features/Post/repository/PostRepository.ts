<<<<<<< HEAD
import { PostImages } from "../model/PostImages";
import { Post } from "../model/PostModel";
import { User } from "../../UserProfile/model/User";

// Interface that defines the methods of the PostRepo class
interface IPostRepo {
    savePost({ userId, postText, postName }: { userId: string, postText: string, postName: string | null }): Promise<void>;
    getAllPosts({ userId }: { userId: string }): Promise<Post[]>;
    getImageNamesOfPost({ postId }: { postId: number }): Promise<string[]>;
}

class PostRepo implements IPostRepo {
    // Method to save a new post with images
    async savePost({ userId, postText, postName, fileNames }: { userId: string, postText: string, fileNames: string[] | null, postName: string }): Promise<void> {
        try {
            const post = new Post();

            // Set attributes of the new post
            post.text = postText;
            post.userId = userId;
            post.name = postName;
            post.likes = 0;
            post.comments = 0;

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
    async getAllPosts({ userId }: { userId: string }) {
        try {
            const posts: Post[] = await Post.findAll({ where: { userId: userId } , include:[{model:User}]});
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
=======
import { PostImages } from "../model/PostImages";
import { Post } from "../model/PostModel";

// Interface that defines the methods of the PostRepo class
interface IPostRepo {
    savePost({ userId, postText, postName }: { userId: number, postText: string, postName: string | null }): Promise<void>;
    getAllPosts({ userId }: { userId: number }): Promise<Post[]>;
    getImageNamesOfPost({ postId }: { postId: number }): Promise<string[]>;
}

class PostRepo implements IPostRepo {
    // Method to save a new post with images
    async savePost({ userId, postText, postName, fileNames }: { userId: number, postText: string, fileNames: string[] | null, postName: string }): Promise<void> {
        try {
            const post = new Post();

            // Set attributes of the new post
            post.text = postText;
            post.userId = userId;
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
    async getAllPosts({ userId }: { userId: number }) {
        try {
            const posts: Post[] = await Post.findAll({ where: { userId: userId } });
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
>>>>>>> 083bb9737406d5cc219ca9fd883c90697dabefac
