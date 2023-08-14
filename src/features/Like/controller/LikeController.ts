import { Request, Response } from "express";
import LikeRepository from "../repository/LikeRepository";
import { Like } from "../model/LikeModel";

interface LikeData {
    userEmail: string,
    postId: number,
    likeId: number
}

class LikeController {
    async saveLike(req: Request, res: Response) {
        try {
            const data: LikeData = req.body;
            await LikeRepository.saveLike({ userEmail: data.userEmail, postId: data.postId });

            res.status(200).json({
                message: 'Like saved succesfully'
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot save like ${err}`
            });
        }
    }

    async removeLike(req: Request, res: Response) {
        try {
            const data: LikeData = req.body;
            await LikeRepository.removeLike({ likeId: data.likeId, postId: data.postId });

            res.status(200).json({
                message: 'Like deleted succesfully'
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot delete like ${err}`
            });
        }
    }

    async getPostLikes(req: Request, res: Response) {
        try {
            const postId: number = parseInt(req.params.postId);
            const likes: Like[] = await LikeRepository.getPostLikes({ postId: postId });

            res.status(200).json({
                message: 'Got post likes succesfully',
                data: likes
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot get post likes ${err}`
            });
        }
    }
}

export default new LikeController;