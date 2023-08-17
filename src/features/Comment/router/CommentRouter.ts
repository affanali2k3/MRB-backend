import BaseRoutes from "../../../router/base/BaseRouter";
import CommentController from "../controller/CommentController";


class CommentRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/", CommentController.saveComment);
        this.router.get("/:postId", CommentController.getPostComments);

    }
}

export default new CommentRouter().router