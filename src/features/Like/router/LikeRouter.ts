import BaseRoutes from "../../../router/base/BaseRouter";
import multer from "multer";
import fs from "fs";
import LikeController from "../controller/LikeController";


class LikeRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/", LikeController.saveLike);
        this.router.get("/:postId", LikeController.getPostLikes);

    }
}

export default new LikeRouter().router