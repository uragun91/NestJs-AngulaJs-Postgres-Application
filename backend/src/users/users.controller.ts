import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { IUser } from './user.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/files.util';
import { UsersService } from './users.service';
import { RequestWithUser } from 'src/auth/request-with-user.interface';
import { DatabaseFileEntity } from 'src/user-images/database-file.entyty';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getUserFiles(
    @Req() req: RequestWithUser,
  ): Promise<DatabaseFileEntity[]> {
    return await this.usersService.getUserFiles(req.user.id);
  }

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: {
        fileSize: 5242880,
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadMultipleFiles(
    @Req() request: RequestWithUser,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    files.map(async (file: Express.Multer.File) => {
      return await this.usersService.addUserFile(
        request.user,
        file.buffer,
        file.originalname,
      );
    });

    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
