import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupPostDto } from 'src/auth/signup-post.dto';
import { DatabaseFileEntity } from 'src/user-images/database-file.entyty';
import { DatabaseFilesService } from 'src/user-images/databse-file.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly databaseFilesService: DatabaseFilesService,
  ) {}

  async addUserFile(
    user: UserEntity,
    fileBuffer: Buffer,
    filename: string,
  ): Promise<DatabaseFileEntity> {
    return await this.databaseFilesService.uploadDatabaseFile(
      fileBuffer,
      filename,
      user,
    );
  }

  async getUserFiles(userId: number): Promise<DatabaseFileEntity[]> {
    return await this.databaseFilesService.getFilesByUser(userId);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(payload: SignupPostDto) {
    const newUser = await this.userRepository.create(payload);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
