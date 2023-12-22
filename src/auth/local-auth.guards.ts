import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    // If there was an error during authentication or no user was returned
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid credentials');
    }
    // Return the authenticated user
    return user;
  }
}
