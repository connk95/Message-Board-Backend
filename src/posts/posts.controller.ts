import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { InsertPostDto } from './post.dto';
import { InsertCommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comments.service';
import { Posts } from './post.model';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addPost(@Body() body: InsertPostDto): Promise<string> {
    return await this.postsService.insertPost(body);
  }

  @Patch(':id')
  public async addComment(@Body() body: InsertCommentDto): Promise<string> {
    return await this.commentsService.insertComment(body);
  }

  @Get()
  async getAllPosts(): Promise<Posts[]> {
    return await this.postsService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<Posts> {
    return await this.postsService.getSinglePost(id);
  }

  @Delete(':id')
  async removePost(@Param('id') postId: string): Promise<Posts> {
    await this.postsService.deletePost(postId);
    return null;
  }
}
