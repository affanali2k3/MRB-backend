import BaseRoutes from "../../../router/base/BaseRouter";
import AgreementStatusController from "../controller/AgreementStatusController";

class AgreementStatusRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/create", AgreementStatusController.create);
    this.router.get("/get-all", AgreementStatusController.getAllStatus);
  }
}

export default new AgreementStatusRouter().router;
