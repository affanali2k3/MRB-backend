import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as fs from 'fs';
import { PostService } from './post.service';
import { SavePostDto } from './dto/save-post.dto';
import { GetPostImageDto } from './dto/get-post-image.dto';
import * as path from 'path';

const storage = diskStorage({
  destination: (req, file, cb) => {
    console.log('c');

    const userId: number = req.body.userId;
    console.log(userId);

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);

    const uniqueFolderName = `${timestamp}_${randomString}`;

    const destinationPath = `./storage/${userId}/postImages/${uniqueFolderName}/`;
    console.log(destinationPath);

    req['folderName'] = uniqueFolderName;

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    console.log('b');

    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const uniqueFileName = `${timestamp}_${randomString}.jpg`;

    cb(null, uniqueFileName);
  },
});

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  async savePost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: SavePostDto,
    @Req() req: Request,
  ) {
    try {
      const images = files.map((file) => file.filename);

      createPostDto.fileNames = images;

      await this.postService.savePost(createPostDto, req['folderName']);
      console.log('request completed');
      return { message: 'Post saved successfully' };
    } catch (err: any) {
      console.log(err);
      throw new HttpException(
        `Cannot save post: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('delete')
  async deletePost(@Body() postId: number) {
    try {
      await this.postService.deletePost(postId);
      return { message: 'Post deleted successfully' };
    } catch (err: any) {
      throw new HttpException(
        `Cannot delete post: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('share')
  // async sharePost(@Body() sharePostDto: SharePostDto) {
  //   try {
  //     await this.postService.sharePost(sharePostDto);
  //     return { message: 'Post shared successfully' };
  //   } catch (err: any) {
  //     throw new HttpException(
  //       `Cannot share post: ${err.message}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Get('get-all')
  async getAllPosts(@Query('userId') userId: string) {
    try {
      const posts = await this.postService.getAllPosts(+userId);
      return {
        message: 'Got all posts successfully',
        data: posts,
      };
    } catch (err: any) {
      throw new HttpException(
        `Cannot get posts: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('post-image')
  async getPostImage(@Query() dto: GetPostImageDto) {
    try {
      const filePath = path.join(
        'storage',
        dto.userId,
        'postImages',
        dto.post,
        dto.image,
      );

      if (!fs.existsSync(filePath)) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      const file = fs.createReadStream(filePath);
      return new StreamableFile(file, {
        type: 'image/jpeg',
        disposition: `attachment; filename="${dto.image}"`,
      });
    } catch (err: any) {
      throw new HttpException(
        `Cannot get post image: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
