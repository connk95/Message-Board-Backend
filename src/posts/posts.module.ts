import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './post.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
