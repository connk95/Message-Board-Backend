import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';
import { Comments } from 'src/comments/comment.model';
import { Posts } from 'src/posts/post.model';

export class InsertUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(18)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password: string;

  @IsString()
  email: string;

  @IsArray()
  likes?: [];
}

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  password?: string;

  @IsString()
  email?: string;

  @IsArray()
  likes?: [];

  @IsArray()
  posts?: Posts;

  @IsArray()
  comments?: Comments[];

  @IsString()
  newCommentId?: string;
}
