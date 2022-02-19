import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupPostDto } from 'src/auth/signup-post.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getCurrentUser() {
    const user = this.userRepository.findOne();
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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

  getUserImages() {
    // do stuff
  }

  saveUserImage() {
    // do stuff
  }
}
