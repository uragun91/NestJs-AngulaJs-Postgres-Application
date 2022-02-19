import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { IUser } from './user.interface';

@Controller('users')
export class UsersController {
  @Get('current')
  getCurrentUser(): IUser {
    return { email: 'test' };
  }

  @Get('images')
  @UseGuards(JwtAuthenticationGuard)
  getUserImages(): any {
    return '';
  }

  @Post('images')
  @UseGuards(JwtAuthenticationGuard)
  saveUserImage(): any {
    return '';
  }
}
