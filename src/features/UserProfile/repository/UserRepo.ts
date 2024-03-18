import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import PostRepository from "../../Post/repository/PostRepository";
import UserPreferences from "../../UserPreference/model/UserPreferenceModel";
import { CreateUserData, UpdateUserData } from "../controller/UserController";
import { User } from "../model/User";

// Define the interface for UserRepo
interface IUserRepo {
  create(user: User): Promise<void>;
  update(data: UpdateUserData): Promise<void>;
  getUserByEmail(userEmail: string): Promise<User>;
  getUser(userId: number): Promise<User>;
  getAll(): Promise<User[]>;
}

// Implement the UserRepo class
class UserRepo implements IUserRepo {
  // Create a new user
  async create(data: CreateUserData): Promise<void> {
    try {
      const user = new User();

      user.email = data.email;
      user.name = data.name;

      const newUser = await user.save();

      const agentAnalytic: AgentAnalytic = new AgentAnalytic();

      agentAnalytic.referralsReceived = 0;
      agentAnalytic.referralsSent = 0;
      agentAnalytic.yearsOfExperience = 0;
      agentAnalytic.housesBought = 0;
      agentAnalytic.housesSold = 0;
      agentAnalytic.agentToAgentRatingNumber = 0;
      agentAnalytic.agentToAgentRatingScore = 0;
      agentAnalytic.agentToAgentRating = 0;
      agentAnalytic.userId = newUser.id;

      await agentAnalytic.save();

      const agentPreference: UserPreferences = new UserPreferences();

      agentPreference.userId = newUser.id;

      await agentPreference.save();
    } catch (err) {
      throw new Error(`Failed to create user. ${err}`);
    }
  }

  // Update an existing user
  async update(data: UpdateUserData): Promise<void> {
    try {
      const updatedUser = await User.findOne({
        where: {
          id: data.id,
        },
      });

      if (!updatedUser) throw new Error("User not found");

      if (data.biography !== undefined) {
        updatedUser.biography = data.biography;
      }

      if (data.photo !== undefined) {
        updatedUser.photo = data.photo;
      }

      if (data.coverPhoto !== undefined) {
        updatedUser.coverPhoto = data.coverPhoto;
      }

      if (data.licenseNumber !== undefined) {
        updatedUser.licenseNumber = data.licenseNumber;
      }

      if (data.licenseState !== undefined) {
        updatedUser.licenceState = data.licenseState;
      }

      if (data.licenseYear !== undefined) {
        updatedUser.licenseYear = data.licenseYear;
      }

      if (data.phone !== undefined) {
        updatedUser.phone = data.phone;
      }

      await PostRepository.createUpdatedProfilePost({ userId: data.id });

      // Save the updated user
      await updatedUser.save();
    } catch (err) {
      throw new Error(`Failed to update user. ${err}`);
    }
  }

  // Get user by email
  async getUser(userId: number): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) throw new Error("User not found");

      return user;
    } catch (err) {
      throw new Error(`Failed to get user. ${err}`);
    }
  }
  async getUserByEmail(userEmail: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (!user) throw new Error("User not found");

      return user;
    } catch (err) {
      throw new Error(`Failed to get user. ${err}`);
    }
  }

  // Get all users
  async getAll(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      throw new Error("Failed to get users.");
    }
  }
}

export default new UserRepo();
