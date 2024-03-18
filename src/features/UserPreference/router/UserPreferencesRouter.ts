import BaseRoutes from "../../../router/base/BaseRouter";
import UserPreferencesController from "../controller/UserPreferencesController";
import UserPreferenceMiddleware from "../middleware/UserPreferenceMiddleware";
import UserPreferencesValidator from "../helper/validate";
import validate from "../../../helper/validate";
import { getUserPreferenceSchema, updateUserPreferenceSchema } from "../schema/UserPreferenceSchema";

class UserPreferencesRouter extends BaseRoutes {
  routes(): void {
    this.router.patch("/update", validate(updateUserPreferenceSchema), UserPreferencesController.updatePreference);
    this.router.get("/get", UserPreferencesValidator.getUserPrefrenceValidate, UserPreferencesController.getPreferences);
  }
}

export default new UserPreferencesRouter().router;
