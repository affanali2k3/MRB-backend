import { Comment } from "../model/CommentModel";

interface ICommentRepo {
    saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<void>;
    getPostComments({ postId }: { postId: number }): Promise<Comment[]>;
}

class CommentRepo implements ICommentRepo {
    async saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<void> {
        try {
            const comment = new Comment();
            comment.postId = postId;
            comment.userEmail = userEmail;
            comment.text = text;

            await comment.save();

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async getPostComments({ postId }: { postId: number }): Promise<Comment[]> {
        try {
            const comments: Comment[] = await Comment.findAll({ where: { postId: postId } });
            return comments;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }


}

export default new CommentRepo;