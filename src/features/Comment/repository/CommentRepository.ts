import { Comment } from "../model/CommentModel";

interface ICommentRepo {
    saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<number>;
    getPostComments({ postId }: { postId: number }): Promise<Comment[]>;
}

class CommentRepo implements ICommentRepo {
    async saveComment({ postId, userEmail, text }: { userEmail: string, postId: number, text: string }): Promise<number> {
        try {
            const comment = new Comment();
            comment.postId = postId;
            comment.userEmail = userEmail;
            comment.text = text;

            const savedComment = await comment.save();

            return savedComment.id;

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