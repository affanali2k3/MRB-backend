import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import NotificationController from "../controller/NotificationController";

class NotificationRouter extends BaseRoutes {
  public routes(): void {
    this.router.get("", NotificationController.getAllNotifications);
  }
}

export default new NotificationRouter().router;
