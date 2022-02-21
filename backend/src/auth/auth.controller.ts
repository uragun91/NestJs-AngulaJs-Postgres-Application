import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from 'src/users/user.entity';
import AuthService from './auth.service';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { RequestWithUser } from './request-with-user.interface';
import { SignupPostDto } from './signup-post.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @Post('signup')
  async signup(@Body() payload: SignupPostDto): Promise<void> {
    if (payload) {
    } else {
      throw new HttpException('No signup data', HttpStatus.BAD_REQUEST);
    }

    await this.authService.signup(payload);
  }
}
