import UserAssociatesController from "../controller/UserAssociatesController";
import BaseRoutes from "../../../router/base/BaseRouter";
import UserAssociatesMiddleware from "../middleware/UserAssociatesMiddleware";
import validate from "../../../helper/validate";
import { requestBodySchema } from "../schema/UserPreferenceSchema";
import { getUserSchema } from "../../UserProfile/schema/UserSchema";

class UserAssociatesRouter extends BaseRoutes {
  public routes(): void {
    // Endpoint to send a connection request
    this.router.post("/send", validate(requestBodySchema), UserAssociatesController.sendRequest);

    // Endpoint to accept a connection request
    this.router.patch("/accept", validate(requestBodySchema), UserAssociatesController.acceptRequest);

    // Endpoint to decline a connection request
    this.router.patch("/reject", validate(requestBodySchema), UserAssociatesController.declineRequest);

    // Endpoint to cancel a connection request
    this.router.delete("/cancel", validate(requestBodySchema), UserAssociatesController.cancelRequest);

    // Endpoint to get all associates of a user
    this.router.get("/get-all", validate(getUserSchema), UserAssociatesController.getAllAssociates);

    // Endpoint to remove an associate
    this.router.delete("/remove", UserAssociatesController.removeAssociate);

    // Endpoint to check connection request status with a user
    this.router.post("/status", UserAssociatesController.checkRequestStatusWithUser);
  }
}

export default new UserAssociatesRouter().router;
