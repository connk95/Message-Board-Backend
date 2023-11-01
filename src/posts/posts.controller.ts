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
  //will this work??????
  public async addPost(@Body() body: InsertPostDto): Promise<{ id: string }> {
    const generatedId = await this.postsService.insertPost(body);
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
  public async updatePost(
    @Param('id') postId: string,
    @Body() body: UpdatePostDto,
  ): Promise<Posts> {
    return await this.postsService.updatePost(postId, body);
  }

  //   @Param('id') postId: string,
  //   // @Body('title') postTitle: string,
  //   // @Body('body') postBody: string,
  //   // // @Body('date') postDate: string,
  //   // @Body('user') postUser: string,
  //   // @Body('likes') postLikes: number,
  //   // @Body('comments') postComments: [],
  // ) {
  //   await this.postsService.updatePost(
  //     postId,
  //     postTitle,
  //     postText,
  //     // postDate,
  //     postUser,
  //     postLikes,
  //     postComments,
  //   );
  //   return null;
  // }

  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
