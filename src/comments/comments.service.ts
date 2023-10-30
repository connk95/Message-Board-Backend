import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async insertComment(body: string, date: string, user: string, likes: number) {
    const newComment = new this.commentModel({
      body,
      date,
      user,
      likes,
    });
    const result = await newComment.save();
    return result.id as string;
  }

  async getComments() {
    const comments = await this.commentModel.find().exec();
    return comments.map((comment) => ({
      id: comment.id,
      body: comment.body,
      user: comment.user,
      likes: comment.likes,
    }));
  }

  async getSingleComment(commentId: string) {
    const comment = await this.findComment(commentId);
    return {
      id: comment.id,
      body: comment.body,
      user: comment.user,
      likes: comment.likes,
    };
  }

  async updateComment(
    commentId: string,
    body: string,
    date: string,
    user: string,
    likes: number,
  ) {
    const updatedComment = await this.findComment(commentId);
    if (body) {
      updatedComment.body = body;
    }
    if (date) {
      updatedComment.date = date;
    }
    if (user) {
      updatedComment.user = user;
    }
    if (likes) {
      updatedComment.likes = likes;
    }
    updatedComment.save();
  }

  async deleteComment(commentId: string) {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find comment.');
    }
  }

  private async findComment(id: string): Promise<Comment> {
    let comment;
    try {
      comment = await this.commentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find comment.');
    }
    if (!comment) {
      throw new NotFoundException('Could not find comment.');
    }
    return comment;
  }
}
