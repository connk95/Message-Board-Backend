import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Posts } from './post.model';
import { InsertPostDto, UpdatePostDto } from './post.dto';
// import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/user.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Posts>, // private readonly usersService: UsersService,
  ) {}

  async insertPost({ title, text, user }: InsertPostDto): Promise<string> {
    // const userId = user._id || user;
    const newPost = new this.postModel({
      title,
      text,
      user,
    });
    const result = await newPost.save();

    // const updatedUser = await this.usersService.updateUserPosts(
    //   user._id,
    //   result._id,
    // );

    if (!result) {
      throw new Error('Could not add post');
    }
    return result.id as string;
  }

  public async getPosts(): Promise<Posts[]> {
    const posts = await this.postModel.find().populate('User').exec();
    return posts;
  }

  async getSinglePost(postId: string): Promise<Posts> {
    const post = await this.findPost(postId);
    return post;
  }

  // async findByPostId(postId: string): Promise<Posts> {
  //   try {
  //     const post = await this.postModel.findOne({ postId }).exec();
  //     if (post && post.id == postId) {
  //       return post;
  //     } else {
  //       throw new NotFoundException('Post not found');
  //     }
  //   } catch (error) {
  //     throw new NotFoundException('Post not found');
  //   }
  // }

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
      post = await (await this.postModel.findOne({ id })).populate('User');
      // .exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
