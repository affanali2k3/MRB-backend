import BaseRoutes from "../../../router/base/BaseRouter";
import AgreementController from "../controller/AgreementController";

class AgreementRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/create", AgreementController.createAgreement);
    this.router.patch("/update-by-sender", AgreementController.updateAgreementBySender);
    this.router.patch("/accept-by-sender", AgreementController.acceptAgreementBySender);
    this.router.patch("/accept-by-receiver", AgreementController.acceptAgreementByReceiver);
    this.router.patch("/start", AgreementController.startAgreement);
  }
}

export default new AgreementRouter().router;
