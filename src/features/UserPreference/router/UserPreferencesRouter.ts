import BaseRoutes from "../../../router/base/BaseRouter";
import UserPreferencesController from "../controller/UserPreferencesController";


class UserPreferencesRouter extends BaseRoutes {

    routes(): void {
        this.router.patch('/update', UserPreferencesController.updatePreference);
        this.router.get('/get', UserPreferencesController.getPreferences);
    }
}

export default new UserPreferencesRouter().router;