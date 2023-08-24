import BaseRoutes from "../../../router/base/BaseRouter"; // Import the BaseRoutes class
import AgentInviteeController from "../controller/AgentInviteeController";
import AgentInviteCodeController from "../controller/AgentInviteeController";

// Create a LikeRouter class that extends the BaseRoutes class
class AgentInviteeRouter extends BaseRoutes {
    public routes(): void {
        // Define routes for saving likes, getting post likes, and removing likes
        this.router.post("/create", AgentInviteeController.saveInvitee); // Route for saving a like
        this.router.delete("/delete/:inviteeId", AgentInviteeController.deleteInvitee); // Route for saving a like
        this.router.get("/all/:userEmail", AgentInviteeController.getAllInviteesForUser); // Route for saving a like
    }
}

export default new AgentInviteeRouter().router; // Export an instance of the LikeRouter class with defined routes
