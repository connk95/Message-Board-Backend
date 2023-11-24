// import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guards';
// import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  // constructor(
  //   private authService: AuthService,
  //   private appService: AppService,
  // ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log('test app controller');
  //   return this.authService.login(req.user);
  // }

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
