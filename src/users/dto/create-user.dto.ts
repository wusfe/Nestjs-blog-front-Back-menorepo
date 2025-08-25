import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

// 注意这里是返回一个DTO类， 类 !== 不是一个对象
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @IsEmail() // 定义邮件格式
  @Length(5, 100)
  email: string; 

  @IsString()
  @IsNotEmpty()
  @Length(5, 72)
  password: string;
} 