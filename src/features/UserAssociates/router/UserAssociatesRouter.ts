import UserAssociatesController from "../controller/UserAssociatesController";
import BaseRoutes from "../../../router/base/BaseRouter";

class UserAssociatesRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/send", UserAssociatesController.sendRequest)
        this.router.post("/accept", UserAssociatesController.acceptRequest)
    }
}

export default new UserAssociatesRouter().router