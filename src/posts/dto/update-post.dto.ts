import { IsArray, IsInt, IsOptional, IsPositive, IsString, MaxLength, ArrayUnique } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number | null;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  tagIds?: number[];
} 