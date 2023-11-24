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
  public async addUser(@Body() body: InsertUserDto): Promise<{ id: string }> {
    const generatedId = await this.usersService.insertUser(body);
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

  @UseGuards(AuthGuard())
  @Get()
  getUsername(username) {
    console.log('test controller');
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
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
