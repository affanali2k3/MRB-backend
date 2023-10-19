import { FiltersSearchData } from "../../ReferralCenter/controller/ReferralCenterController";
import { UserPreferencesData } from "../controller/UserPreferencesController";
import UserPreferences from "../model/UserPreferenceModel";

interface IUserPreferenceRepo {
  createPreference({ userId }: { userId: number }): Promise<void>;
  updatePreference(data: UserPreferencesData): Promise<UserPreferences>;
}

class UserPreferenceRepo implements IUserPreferenceRepo {
  async createPreference({ userId }: { userId: number }): Promise<void> {
    try {
      const userPreference = new UserPreferences();
      userPreference.userId = userId;

      await userPreference.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getPreference({
    userId,
  }: {
    userId: number;
  }): Promise<UserPreferences> {
    try {
      const userPreference = await UserPreferences.findOne({
        where: { userId: userId },
      });

      if (!userPreference) throw new Error("User Preference not found");

      return userPreference;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async updatePreference(data: UserPreferencesData): Promise<UserPreferences> {
    try {
      const userPreference = await UserPreferences.findOne({
        where: { userId: data.userId },
      });

      if (!userPreference) throw new Error("User Preference not found");

      userPreference.state = data.state;
      userPreference.city = data.city;
      userPreference.clientType = data.clientType;
      userPreference.houseType = data.houseType;
      userPreference.maxCost = data.maxCost;
      userPreference.minCost = data.minCost;
      userPreference.maxTimeAmount = data.maxTimeAmount;
      userPreference.minTimeAmount = data.minTimeAmount;

      const savedPreference = await userPreference.save();

      return savedPreference;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new UserPreferenceRepo();
