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
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    return await this.commentsService.insertComment(body);
  }

  @Get()
  async getAllComments(): Promise<Comments[]> {
    return await this.commentsService.getComments();
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<Comments> {
    return await this.commentsService.getSingleComment(id);
  }

  @Patch(':id')
  public async updateComment(
    @Param('id') commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comments> {
    return await this.commentsService.updateComment(commentId, body);
  }

  @Delete(':id')
  async removeComment(@Param('id') commentId: string): Promise<Comments> {
    await this.commentsService.deleteComment(commentId);
    return null;
  }
}
