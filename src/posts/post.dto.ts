import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class InsertPostDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(220)
  text: string;

  @IsString()
  user: string;
}

export class UpdatePostDto {
  @IsString()
  @MaxLength(220)
  text?: string;

  @IsArray()
  likes?: [];
}
