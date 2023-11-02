import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comments } from './comment.model';
import { InsertCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comments>,
  ) {}

  async insertComment({ text, user, post }: InsertCommentDto): Promise<string> {
    const newComment = new this.commentModel({
      text,
      user, //user reference
      post, //post reference
    });
    const result = await newComment.save();
    if (!result) {
      throw new Error('Could not add comment');
    }
    return result.id as string;
  }

  async getComments() {
    const comments = await this.commentModel.find().populate('user').exec();
    return comments;
  }

  async getSingleComment(commentId: string) {
    const comment = await this.findComment(commentId);
    return comment;
  }

  async updateComment(
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comments> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      body,
    );
    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }
    return updatedComment;
  }

  async deleteComment(commentId: string) {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find comment.');
    }
  }

  private async findComment(id: string): Promise<Comments> {
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
