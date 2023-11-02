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
import { InsertCommentDto, UpdateCommentDto } from './comment.dto';
import { Comments } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  public async addComment(
    @Body() body: InsertCommentDto,
  ): Promise<{ id: string }> {
    const generatedId = await this.commentsService.insertComment(body);
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
  public async updateComment(
    @Param('id') commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comments> {
    return await this.commentsService.updateComment(commentId, body);
  }

  @Delete(':id')
  async removeComment(@Param('id') commentId: string) {
    await this.commentsService.deleteComment(commentId);
    return null;
  }
}
