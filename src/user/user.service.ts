import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { UserPreference } from 'src/user-preference/user.preference.model';
import { PostService } from 'src/post/post.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private model: typeof User,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
    @InjectModel(UserPreference)
    private userPreferenceModel: typeof UserPreference,
    private readonly postService: PostService,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    try {
      const user = this.model.build({
        ...dto,
      });

      const newUser = await user.save();

      const agentAnalytic = this.agentAnalyticModel.build({
        referralsReceived: 0,
        referralsSent: 0,
        yearsOfExperience: 0,
        housesBought: 0,
        housesSold: 0,
        agentToAgentRatingNumber: 0,
        agentToAgentRatingScore: 0,
        agentToAgentRating: 0,
        userId: newUser.id,
      });

      await agentAnalytic.save();

      const agentPreference = this.userPreferenceModel.build({
        userId: newUser.id,
      });

      await agentPreference.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.model.findOne({
        where: {
          id: id,
        },
      });

      if (!updatedUser) throw new NotFoundException();

      if (dto.name !== undefined) {
        updatedUser.name = dto.name;
      }

      if (dto.biography !== undefined) {
        updatedUser.biography = dto.biography;
      }

      if (dto.photo !== undefined) {
        updatedUser.photo = dto.photo;
      }

      if (dto.licenseNumber !== undefined) {
        updatedUser.licenseNumber = dto.licenseNumber;
      }

      if (dto.licenseState !== undefined) {
        updatedUser.licenseState = dto.licenseState;
      }

      if (dto.licenseYear !== undefined) {
        updatedUser.licenseYear = parseInt(dto.licenseYear.toString());
      }

      if (dto.phone !== undefined) {
        updatedUser.phone = dto.phone;
      }

      await this.postService.createUpdatedProfilePost(dto.id);

      // Save the updated user
      await updatedUser.save();

      return updatedUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = await this.model.findOne({
        include: [
          {
            model: AgentAnalytic,
          },
        ],
        where: {
          id: id,
        },
      });

      if (!user) throw new NotFoundException();

      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.model.findOne({
        include: [
          {
            model: AgentAnalytic,
          },
        ],
        where: {
          email: email,
        },
      });

      if (!user) throw new NotFoundException();

      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.model.findAll();
      return users;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
