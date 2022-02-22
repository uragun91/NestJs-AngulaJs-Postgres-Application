import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupPostDto } from './signup-post.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { PostgresErrorCode } from 'src/database/enums/postgress-error-codes.enum';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExceptionCodes } from 'src/exceptions/exception-codes.enum';

@Injectable()
export default class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(payload: SignupPostDto) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    try {
      return await this.usersService.createUser({
        ...payload,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          ExceptionCodes.USER_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          ExceptionCodes.WRONG_CREDENTIALS,
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        ExceptionCodes.WRONG_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        ExceptionCodes.WRONG_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieForLogOut() {
    return `Authentication=; Path=/; Max-Age=0`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const expiration = this.configService.get('JWT_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, { expiresIn: expiration });
    return `Authentication=${token}; Path=/; Max-Age=84600`;
  }
}
