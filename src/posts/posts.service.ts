import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Posts } from './post.model';
import { InsertPostDto, UpdatePostDto } from './post.dto';
import { UsersService } from 'src/users/users.service';
import { Comments } from 'src/comments/comment.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<Posts>,
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

    await this.userService.addPostToUser(user, result);

    return result.id as string;
  }

  public async getPosts(): Promise<Posts[]> {
    return await this.postModel.find().populate('user').exec();
  }

  async getSinglePost(postId: string): Promise<Posts> {
    return await this.findPost(postId);
  }

  async updatePost(postId: string, body?: UpdatePostDto): Promise<Posts> {
    const updatedPost = await this.postModel.findByIdAndUpdate(postId, body, {
      new: true,
    });

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  async addCommentToPost(postId: string, comment: Comments): Promise<Posts> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true },
    );

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Could not delete post');
    }
  }

  private async findPost(id: string): Promise<Posts> {
    let post;
    try {
      post = await this.postModel.findById(id).populate([
        {
          path: 'comments',
          populate: { path: 'user' },
        },
        'user',
      ]);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
