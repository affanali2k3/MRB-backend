import UserAssociatesController from "../controller/UserAssociatesController";
import BaseRoutes from "../../../router/base/BaseRouter";

class UserAssociatesRouter extends BaseRoutes {
    public routes(): void {
        this.router.post("/send", UserAssociatesController.sendRequest)
        this.router.patch("/accept", UserAssociatesController.acceptRequest)
        this.router.patch("/reject", UserAssociatesController.declineRequest)
        this.router.delete("/cancel", UserAssociatesController.cancelRequest)
        this.router.get("/getAll", UserAssociatesController.getAllAssociates)
        this.router.delete("/remove", UserAssociatesController.removeAssociate)
    }
}

export default new UserAssociatesRouter().router