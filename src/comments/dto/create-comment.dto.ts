import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsPositive()
  postId: number;
} 