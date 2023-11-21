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
import { InsertPostDto, UpdatePostDto } from './post.dto';
import { Posts } from './post.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public async addPost(@Body() body: InsertPostDto): Promise<{ id: string }> {
    const generatedId = await this.postsService.insertPost(body);
    return { id: generatedId };
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getPosts();
    console.log('posttest');
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    console.log(postId);
    return this.postsService.getSinglePost(postId);
  }

  @Patch(':id')
  public async updatePost(
    @Param('id') postId: string,
    @Body() body: UpdatePostDto,
  ): Promise<Posts> {
    return await this.postsService.updatePost(postId, body);
  }

  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
