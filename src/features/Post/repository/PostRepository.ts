import { Post } from "../model/PostModel";


interface IPostRepo {
    savePost({ userEmail, postText, imageFolderPath }: { userEmail: string, postText: string, imageFolderPath: string | null }): Promise<void>;
    getAllPosts({ userEmail }: { userEmail: string }): Promise<Post[]>
}

class PostRepo implements IPostRepo {
    async savePost({ userEmail, postText, imageFolderPath }: { userEmail: string, postText: string, imageFolderPath: string | null }): Promise<void> {
        try {
            const post = new Post();

            post.text = postText;
            post.userEmail = userEmail;
            post.imageFolderPath = imageFolderPath;

            await post.save();

        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async getAllPosts({ userEmail }: { userEmail: string }) {
        try {
            const posts: Post[] = await Post.findAll({ where: { userEmail: userEmail } });
            return posts;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}

export default new PostRepo;