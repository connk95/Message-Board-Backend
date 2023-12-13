import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as mongoose from 'mongoose';

import { Posts } from './post.model';
import { InsertPostDto, UpdatePostDto } from './post.dto';
import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/user.model';
// import { InsertCommentDto } from 'src/comments/comment.dto';
// import { CommentsService } from 'src/comments/comments.service';
// import { Comments } from 'src/comments/comment.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Posts>,
    // @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userService: UsersService, // private readonly commentsService: CommentsService,
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

    await this.userService.updateUser(user, result._id);

    return result.id as string;
  }

  public async getPosts(): Promise<Posts[]> {
    const posts = await this.postModel.find().populate('user').exec();
    return posts;
  }

  async getSinglePost(postId: string): Promise<Posts> {
    const post = await this.findPost(postId);
    return post;
  }

  async updatePost(postId: string, body?: UpdatePostDto): Promise<Posts> {
    console.log('test 1');
    const updatedPost = await this.postModel
      .findByIdAndUpdate(postId, body, {
        new: true,
      })
      .populate('comments');
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    // if (body.newCommentId) {
    //   console.log('test comment');
    //   // const updatedUser = await this.userModel.findById(body.user);
    //   const commentIdObject = new mongoose.Types.ObjectId(body.newCommentId);
    //   updatedPost.comments.push(commentIdObject);
    //   // updatedUser.comments.push(commentIdObject);
    //   await this.userService.updateUser(body.user, commentIdObject);

    //   // await updatedUser.save();
    //   await updatedPost.save();
    // }

    // if (body.newCommentId) {
    //   const commentIdObject = new mongoose.Types.ObjectId(body.newCommentId);
    //   await this.addCommentToPost(postId, commentIdObject);
    //   await this.userService.addCommentToUser(body.user, commentIdObject);
    // }

    return updatedPost;
  }

  async addCommentToPost(postId: string, commentId: string): Promise<Posts> {
    console.log('test addCommentToPost, id: ', commentId);
    console.log('post service postId: ', postId);
    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      { $push: { comments: commentId } },
      { new: true },
    );
    console.log('post: ', updatedPost);
    // .populate('comments');

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
