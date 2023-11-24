import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guards';
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
  //   async test() {
  //     console.log('test');
  //   }
}
