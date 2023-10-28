import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async insertPost(
    title: string,
    body: string,
    date: string,
    user: string,
    likes: number,
    comments: string,
  ) {
    const newPost = new this.postModel({
      title,
      body,
      date,
      user,
      likes,
      comments,
    });
    const result = await newPost.save();
    return result.id as string;
  }

  async getPosts() {
    const posts = await this.postModel.find().exec();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      user: post.user,
      likes: post.likes,
      comments: post.comments,
    }));
  }

  async getSinglePost(postId: string) {
    const post = await this.findPost(postId);
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      user: post.user,
      likes: post.likes,
      comments: post.comments,
    };
  }

  async updatePost(
    postId: string,
    title: string,
    body: string,
    date: string,
    user: string,
    likes: number,
    comments: string,
  ) {
    const updatedPost = await this.findPost(postId);
    if (title) {
      updatedPost.title = title;
    }
    if (body) {
      updatedPost.body = body;
    }
    if (date) {
      updatedPost.date = date;
    }
    if (user) {
      updatedPost.user = user;
    }
    if (likes) {
      updatedPost.likes = likes;
    }
    if (comments) {
      updatedPost.comments = comments;
    }
    updatedPost.save();
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find post.');
    }
  }

  private async findPost(id: string): Promise<Post> {
    let post;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
