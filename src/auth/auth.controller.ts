import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guards';
import { JwtAuthGuard } from './jwt-auth.guards';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('test controller');
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    console.log('test logout');
    req.logout(function (error) {
      if (error) {
        return error;
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('test get profile');
    return req.user;
  }
}
