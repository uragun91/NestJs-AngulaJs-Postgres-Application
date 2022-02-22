import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { DatabaseFileEntity } from './database-file.entyty';

@Injectable()
export class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFileEntity)
    private databaseFilesRepository: Repository<DatabaseFileEntity>,
  ) {}

  async uploadDatabaseFile(
    dataBuffer: Buffer,
    filename: string,
    mimeType: string,
    user: UserEntity,
  ): Promise<DatabaseFileEntity> {
    const exisitngFile = await this.databaseFilesRepository.findOne({
      where: { user: { id: user.id }, filename },
    });

    if (exisitngFile) {
      return exisitngFile;
    }

    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer,
      mimeType: mimeType,
      uploadDate: new Date(),
      user,
    });
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(
    userId: number,
    fileId: number,
  ): Promise<DatabaseFileEntity> {
    return await this.databaseFilesRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId }, id: fileId },
    });
  }

  async getUserFilesWithoutData(userId: number): Promise<DatabaseFileEntity[]> {
    return await this.databaseFilesRepository
      .find({
        where: { user: { id: userId } },
      })
      .then((files) => {
        return files.map((file) => {
          file.data = undefined;
          return file;
        });
      });
  }
}
