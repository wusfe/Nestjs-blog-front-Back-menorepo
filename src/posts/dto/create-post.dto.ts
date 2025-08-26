import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional() // 表示该字段是可选的，如果没传就跳过验证
  @IsInt() // 检查值是否是整数
  @IsPositive() // 检查值是否是正数
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  tagIds?: number[];
} 