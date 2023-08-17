import { Post } from "../../Post/model/PostModel";
import { Like } from "../model/LikeModel";

interface ILikeRepo {
    saveLike({ postId, userEmail }: { userEmail: string, postId: number }): Promise<void>;
    getPostLikes({ postId }: { postId: number }): Promise<Like[]>;
    getLike({ postId, userEmail }: { postId: number, userEmail: string }): Promise<number | null>
    removeLike({ postId }: { postId: number }): Promise<void>

}

class LikeRepo implements ILikeRepo {
    async saveLike({ postId, userEmail }: { userEmail: string, postId: number }): Promise<void> {
        try {
            const like = new Like();
            like.postId = postId;
            like.userEmail = userEmail;

            await like.save();

            const post = await Post.findOne({ where: { id: postId } });

            if (!post) return;

            post.likes = post.likes + 1;

            await post.save();

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async getLike({ postId, userEmail }: { postId: number, userEmail: string }) {
        try {
            const like: Like | null = await Like.findOne({ where: { postId: postId, userEmail: userEmail } });

            if (!like) return null;

            return like.id;

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async removeLike({ likeId, postId }: { likeId: number, postId: number }) {
        try {
            const like: Like | null = await Like.findOne({ where: { id: likeId } });

            if (!like) throw new Error('Like not found');

            const post = await Post.findOne({ where: { id: postId } });

            if (!post) return;

            post.likes = post.likes - 1;

            await post.save();


            await like.destroy();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async getPostLikes({ postId }: { postId: number }): Promise<Like[]> {
        try {
            const likes: Like[] = await Like.findAll({ where: { postId: postId } });
            return likes;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }


}

export default new LikeRepo;