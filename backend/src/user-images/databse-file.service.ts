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
    user: UserEntity,
  ) {
    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer,
      uploadDate: new Date(),
      user,
    });
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFilesByUser(userId: number) {
    return await this.databaseFilesRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }
}
