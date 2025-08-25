import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;
} 