import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { InsertUserDto, UpdateUserDto } from './user.dto';
import { Posts } from 'src/posts/post.model';
import { Comments } from 'src/comments/comment.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // private readonly postService: PostsService,
  ) {}

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
    return await this.userModel.find().populate('username').exec();
  }

  async getSingleUser(userId: string): Promise<User> {
    return await this.findUser(userId);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await this.userModel
        .findOne({ username })
        .populate([{ path: 'posts', populate: { path: 'text' } }, 'comments']);
      if (user && user.username == username) {
        return user;
      } else {
        throw new Error('Incorrect username or password');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(userId: string, body: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    await updatedUser.save();

    return updatedUser;
  }

  async addPostToUser(userId: string, post: Posts): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { posts: post } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async addCommentToUser(userId: string, comment: Comments): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete user');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).populate(['posts', 'comments']);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
