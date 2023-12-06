import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsObject,
} from 'class-validator';
import { User } from 'src/users/user.model';

export class InsertPostDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(240)
  text: string;

  @IsObject()
  user: User;
}

export class UpdatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(220)
  text?: string;

  @IsArray()
  likes?: [];
}
