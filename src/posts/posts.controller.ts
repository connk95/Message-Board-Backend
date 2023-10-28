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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async addPost(
    @Body('title') postTitle: string,
    @Body('body') postBody: string,
    @Body('date') postDate: string,
    @Body('user') postUser: string,
    @Body('likes') postLikes: number,
    @Body('comments') postComments: string,
  ) {
    const generatedId = await this.postsService.insertPost(
      postTitle,
      postBody,
      postDate,
      postUser,
      postLikes,
      postComments,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.getSinglePost(postId);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') postId: string,
    @Body('title') postTitle: string,
    @Body('body') postBody: string,
    @Body('date') postDate: string,
    @Body('user') postUser: string,
    @Body('likes') postLikes: number,
    @Body('comments') postComments: string,
  ) {
    await this.postsService.updatePost(
      postId,
      postTitle,
      postBody,
      postDate,
      postUser,
      postLikes,
      postComments,
    );
    return null;
  }

  @Delete(':id')
  async removePostt(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
