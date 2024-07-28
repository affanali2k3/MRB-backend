import {
  Controller,
  Post,
  Patch,
  Get,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const storage = diskStorage({
  destination: (req, file, cb) => {
    const userId: number = req.body.id;
    const destinationPath = `./storage/${userId}/avatar`;
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return { message: 'User created successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Cannot create user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
    @Query('id') id: string,
  ) {
    try {
      if (file) {
        updateUserDto.photo = file.filename;
      }
      const user = await this.userService.update(+id, updateUserDto);
      return {
        message: 'User updated successfully',
        data: user,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot update user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all')
  async getAllUsers() {
    try {
      const users = await this.userService.getAll();
      return {
        message: 'Got all users successfully',
        data: users,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get users: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get')
  async getUser(@Query('id') id: string) {
    try {
      const user = await this.userService.getUser(+id);
      let file: Buffer;
      try {
        file = fs.readFileSync(user.photo);
      } catch {}

      return {
        message: 'Got user successfully',
        data: user,
        photo: file === undefined ? null : file.toString('base64'),
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get/email')
  async getUserByEmail(@Query('userEmail') userEmail: string) {
    try {
      const user = await this.userService.getUserByEmail(userEmail);
      let file;
      try {
        file = fs.readFileSync(user.photo);
      } catch {}

      return {
        message: 'Got user successfully',
        data: user,
        photo: file === undefined ? null : file.toString('base64'),
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get user: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('avatar')
  async getUserAvatar(
    @Query('userId') userId: string,
    @Query('avatarName') avatarName: string,
  ) {
    try {
      const avatarPath = path.join(
        __dirname,
        '../../../storage',
        userId,
        'avatar',
        avatarName,
      );
      if (fs.existsSync(avatarPath)) {
        return { path: avatarPath };
      } else {
        throw new HttpException(
          'No photo exists for user',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        `Cannot get user avatar: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
