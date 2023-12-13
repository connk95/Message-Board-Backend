import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './comment.model';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
// import { UsersService } from 'src/users/users.service';
// import { PostsService } from 'src/posts/posts.service';
// import { PostsController } from 'src/posts/posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
    // UsersModule,
    // PostsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
