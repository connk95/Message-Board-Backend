import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
