import BaseRoutes from "../../../router/base/BaseRouter"; // Import the BaseRoutes class
import AgentInviteCodeController from "../controller/AgentInviteCodeController";

// Create a LikeRouter class that extends the BaseRoutes class
class AgentInviteCodeRouter extends BaseRoutes {
  public routes(): void {
    // Define routes for saving likes, getting post likes, and removing likes
    this.router.post("/create", AgentInviteCodeController.createCode); // Route for saving a like
    this.router.patch("/share", AgentInviteCodeController.shareCode); // Route for saving a like
    this.router.delete("/delete/:codeId", AgentInviteCodeController.deleteCode); // Route for saving a like
    this.router.get(
      "/all/:userEmail",
      AgentInviteCodeController.getAllCodesForUser
    ); // Route for saving a like
  }
}

export default new AgentInviteCodeRouter().router; // Export an instance of the LikeRouter class with defined routes
