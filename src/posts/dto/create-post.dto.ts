import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  tagIds?: number[];
} 