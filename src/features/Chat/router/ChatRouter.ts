import BaseRoutes from "../../../router/base/BaseRouter";
import ChatController from "../controller/ChatController";

class ChatRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/save", ChatController.saveMessage);
        this.router.post("/getAll", ChatController.getAllMessages);
    }
}

export default new ChatRouter().router