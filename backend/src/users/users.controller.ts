import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { RequestWithUser } from 'src/auth/request-with-user.interface';
import { DatabaseFileWithoutData } from 'src/user-images/database-file-without-data';
import { Readable } from 'stream';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('file/:id')
  @UseGuards(JwtAuthenticationGuard)
  async dowlnoadUserFileById(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) fileId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const file = await this.usersService.getUserFileById(req.user.id, fileId);
    const stream = Readable.from(file.data);

    response.set({
      'Content-Disposition': `attachment; filename="${file.filename}"`,
      'Content-Type': `${file.mimeType}`,
    });

    return new StreamableFile(stream);
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getUserFiles(
    @Req() req: RequestWithUser,
  ): Promise<DatabaseFileWithoutData[]> {
    return await this.usersService.getUserFiles(req.user.id);
  }

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: {
        fileSize: 5242880,
      },
    }),
  )
  async uploadMultipleFiles(
    @Req() request: RequestWithUser,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<string[]> {
    return Promise.all(
      files.map(async (file: Express.Multer.File) => {
        return await this.usersService
          .addUserFile(
            request.user,
            file.buffer,
            file.originalname,
            file.mimetype,
          )
          .then((file) => `/users/file/${file.id}`);
      }),
    );
  }
}
