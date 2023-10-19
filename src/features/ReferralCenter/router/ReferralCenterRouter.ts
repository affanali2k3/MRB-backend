import BaseRoutes from "../../../router/base/BaseRouter";
import ReferralCenterController from "../controller/ReferralCenterController";

class ReferralCenterRouter extends BaseRoutes {
  routes(): void {
    this.router.get("/search", ReferralCenterController.searchForLeads);
  }
}

export default new ReferralCenterRouter().router;
