import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    username: string,
    password: string,
    posts: [],
    likes: [],
    comments: [],
  ) {
    const newUser = new this.userModel({
      username,
      password,
      posts,
      likes,
      comments,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
      likes: user.likes,
      comments: user.comments,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      likes: user.likes,
      comments: user.comments,
    };
  }

  async updateUser(
    userId: string,
    username: string,
    password: string,
    posts: [],
    likes: [],
    comments: [],
  ) {
    const updatedUser = await this.findUser(userId);
    if (username) {
      updatedUser.username = username;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (posts) {
      updatedUser.posts = posts;
    }
    if (likes) {
      updatedUser.likes = likes;
    }
    if (comments) {
      updatedUser.comments = comments;
    }
    updatedUser.save();
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
}
