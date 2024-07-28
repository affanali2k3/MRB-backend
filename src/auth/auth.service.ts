import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}
  async signup(dto: SignUpDto): Promise<Object> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = this.userModel.build({
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      });

      await user.save();

      const payload = { sub: user.id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userModel.scope('withPassword').findOne({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      console.log(user);

      const payload = { sub: user.id, email: user.email };

      const { password, ...updatedUser } = user.dataValues;

      return {
        user: updatedUser,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
