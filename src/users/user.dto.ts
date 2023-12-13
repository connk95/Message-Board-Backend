import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';

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
  password: string;

  @IsString()
  email: string;

  @IsArray()
  likes?: [];

  @IsString()
  newPostId?: string;

  @IsString()
  newCommentId?: string;
}
