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
// import { Posts } from './post.model';
import { CommentsService } from 'src/comments/comments.service';
// import { InsertCommentDto } from 'src/comments/comment.dto';
// import { CommentsService } from 'src/comments/comments.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  public async addPost(@Body() body: InsertPostDto): Promise<{ id: string }> {
    const generatedId = await this.postsService.insertPost(body);
    return { id: generatedId };
  }

  @Patch(':id')
  public async addComment(
    // @Param('id') postId: string,
    @Body() body: InsertCommentDto,
  ): Promise<string> {
    // await this.postsService.updatePost(postId, body);

    console.log('body: ', body);

    console.log('post controller postId: ', body.postId);

    // const updatedPost = await this.postsService.getSinglePost(postId);
    const generatedId = await this.commentsService.insertComment(body);
    // const updatedPost = await this.postsService.updatePost(postId, body);
    // return { updatedPost, generatedId };
    // return updatedPost;

    return generatedId;
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

  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
