import BaseRoutes from "../../../router/base/BaseRouter";
import RegistrationController from "../controller/RegistrationController";

class RegistrationRouter extends BaseRoutes {
  routes(): void {
    this.router.patch("/update", RegistrationController.update);
    this.router.post("/create", RegistrationController.createUser);
  }
}

export default new RegistrationRouter().router;
