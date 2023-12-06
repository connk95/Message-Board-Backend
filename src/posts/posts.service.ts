import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Posts } from './post.model';
import { InsertPostDto, UpdatePostDto } from './post.dto';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Posts>,
    private readonly userService: UsersService,
  ) {}

  async insertPost({ title, text, user }: InsertPostDto): Promise<string> {
    const newPost = new this.postModel({
      title,
      text,
      user,
    });
    const result = await newPost.save();
    if (!result) {
      throw new Error('Could not add post');
    }

    await this.userService.addPostToUser(user, result._id);

    return result.id as string;
  }

  public async getPosts(): Promise<Posts[]> {
    const posts = await this.postModel.find().populate('user').exec(); //why populate user?
    return posts;
  }

  async getSinglePost(postId: string): Promise<Posts> {
    const post = await this.findPost(postId);
    return post;
  }

  async updatePost(postId: string, body: UpdatePostDto): Promise<Posts> {
    const updatedPost = await this.postModel.findByIdAndUpdate(postId, body);
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return updatedPost;
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find post.');
    }
  }

  private async findPost(id: string): Promise<Posts> {
    let post;
    try {
      post = await (await this.postModel.findById(id)).populate('user');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
