import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { InsertUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async addUser(@Body() body: InsertUserDto): Promise<string> {
    return await this.usersService.insertUser(body);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return this.usersService.getSingleUser(userId);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsername(username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(userId, body);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string): Promise<User> {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
