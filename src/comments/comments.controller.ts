import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(
    @Body('body') commentBody: string,
    @Body('date') commentDate: string,
    @Body('user') commentUser: string,
    @Body('likes') commentLikes: number,
  ) {
    const generatedId = await this.commentsService.insertComment(
      commentBody,
      commentDate,
      commentUser,
      commentLikes,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllComments() {
    const comments = await this.commentsService.getComments();
    return comments;
  }

  @Get(':id')
  getComment(@Param('id') commentId: string) {
    return this.commentsService.getSingleComment(commentId);
  }

  @Patch(':id')
  async updateComment(
    @Param('id') commentId: string,
    @Body('body') commentBody: string,
    @Body('date') commentDate: string,
    @Body('user') commentUser: string,
    @Body('likes') commentLikes: number,
  ) {
    await this.commentsService.updateComment(
      commentId,
      commentBody,
      commentDate,
      commentUser,
      commentLikes,
    );
    return null;
  }

  @Delete(':id')
  async removeComment(@Param('id') commentId: string) {
    await this.commentsService.deleteComment(commentId);
    return null;
  }
}
