import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') userUsername: string,
    @Body('password') userPassword: string,
    @Body('posts') userPosts: [],
    @Body('likes') userLikes: [],
    @Body('comments') userComments: [],
  ) {
    const generatedId = await this.usersService.insertUser(
      userUsername,
      userPassword,
      userPosts,
      userLikes,
      userComments,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('username') userUsername: string,
    @Body('password') userPassword: string,
    @Body('posts') userPosts: [],
    @Body('likes') userLikes: [],
    @Body('comments') userComments: [],
  ) {
    await this.usersService.updateUser(
      userId,
      userUsername,
      userPassword,
      userPosts,
      userLikes,
      userComments,
    );
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
