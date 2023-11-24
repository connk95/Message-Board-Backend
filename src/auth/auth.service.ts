import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    console.log('test validate');
    if (user && user.password === pass) {
      //   const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
