import { Like } from "../model/LikeModel";

interface ILikeRepo {
    saveLike({ postId, userEmail }: { userEmail: string, postId: number }): Promise<void>;
    getPostLikes({ postId }: { postId: number }): Promise<Like[]>;
}

class LikeRepo implements ILikeRepo {
    async saveLike({ postId, userEmail }: { userEmail: string, postId: number }): Promise<void> {
        try {
            const like = new Like();
            like.postId = postId;
            like.userEmail = userEmail;

            await like.save();

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