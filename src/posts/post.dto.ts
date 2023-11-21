import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class InsertPostDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text: string;

  @IsString()
  user: string;
}

export class UpdatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text?: string;

  @IsArray()
  likes?: [];
}
