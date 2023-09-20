import UserAssociatesController from "../controller/UserAssociatesController";
import BaseRoutes from "../../../router/base/BaseRouter";

class UserAssociatesRouter extends BaseRoutes {
    public routes(): void {
        // Endpoint to send a connection request
        this.router.post("/send", UserAssociatesController.sendRequest);
        
        // Endpoint to accept a connection request
        this.router.patch("/accept", UserAssociatesController.acceptRequest);
        
        // Endpoint to decline a connection request
        this.router.patch("/reject", UserAssociatesController.declineRequest);
        
        // Endpoint to cancel a connection request
        this.router.delete("/cancel", UserAssociatesController.cancelRequest);
        
        // Endpoint to get all associates of a user
        this.router.get("/get-all", UserAssociatesController.getAllAssociates);
        
        // Endpoint to remove an associate
        this.router.delete("/remove", UserAssociatesController.removeAssociate);
        
        // Endpoint to check connection request status with a user
        this.router.post("/status", UserAssociatesController.checkRequestStatusWithUser);
    }
}

export default new UserAssociatesRouter().router;
