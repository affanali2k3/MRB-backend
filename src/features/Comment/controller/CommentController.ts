import { Request, Response } from "express";
import CommentRepository from "../repository/CommentRepository";
import { Comment } from "../model/CommentModel";

interface CommentData {
    userEmail: string,
    postId: number,
    text: string
}

class CommentController {
    async saveComment(req: Request, res: Response) {
        try {
            const data: CommentData = req.body;
            const commentId: number = await CommentRepository.saveComment({ userEmail: data.userEmail, postId: data.postId, text: data.text });

            res.status(200).json({
                message: 'Comment saved succesfully',
                data: commentId
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot save Comment ${err}`
            });
        }
    }

    async getPostComments(req: Request, res: Response) {
        try {
            const postId: number = parseInt(req.params.postId);
            const comments: Comment[] = await CommentRepository.getPostComments({ postId: postId });

            res.status(200).json({
                message: 'Got post Comments succesfully',
                data: comments
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot get post Comments ${err}`
            });
        }
    }
}

export default new CommentController;