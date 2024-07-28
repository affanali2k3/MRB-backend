import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/user/user.model';

// DTO
export class SearchUserDto {
  userName: string;
}

@Injectable()
export class SearchService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async searchUser(userName: string): Promise<User[]> {
    try {
      const users = await this.userModel.findAll({
        where: { name: { [Op.iLike]: `%${userName}%` } },
      });
      return users;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
