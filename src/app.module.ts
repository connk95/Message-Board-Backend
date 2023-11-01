import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
