import BaseRoutes from "../../../router/base/BaseRouter";
import RegistrationController from "../controller/RegistrationController";


class RegistrationRouter extends BaseRoutes {

    routes(): void {
        this.router.post('/check-email', RegistrationController.checkEmail);
        this.router.post('/check-referral-code', RegistrationController.checkReferralCode);
        this.router.post('/create-user', RegistrationController.createUser);
    }
}

export default new RegistrationRouter().router