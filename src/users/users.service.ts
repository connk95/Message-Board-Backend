import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { InsertUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      email: 'testem',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      email: 'testme',
    },
  ];

  async insertUser({
    username,
    password,
    email,
  }: InsertUserDto): Promise<string> {
    const newUser = new this.userModel({
      username,
      password,
      email,
    });

    const result = await newUser.save();

    if (!result) {
      throw new Error('Could not create user');
    }

    return result.id as string;
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().populate('username').exec();
    return users;
  }

  async getSingleUser(userId: string): Promise<User> {
    const user = await this.findUser(userId);
    return user;
  }

  async updateUser(userId: string, body: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, body);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne((user) => user.username === username);
  }
}
