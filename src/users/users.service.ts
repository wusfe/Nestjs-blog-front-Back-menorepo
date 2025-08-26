import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingByUsername = await this.userRepository.findOne({ where: { username: dto.username } });
    if (existingByUsername) {
      throw new ConflictException('Username already taken');
    }
    const existingByEmail = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingByEmail) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });

    // 这里是save方法
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    if(!id){
      throw new NotFoundException('userId 不能为空');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id:number, dto:UpdateUserDto){
    let user = await this.findById(id)

   
    if(!user){
      throw new NotFoundException('User not found')
    }

    user.username = dto.username;
    user.email = dto.email;
    user.passwordHash = await bcrypt.hash(dto.password, 10);

    return this.userRepository.save(user)
  }
  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async remove(id: number){
    let user = await this.findById(id)

   
     if(!user){
      throw new NotFoundException('User not found')
    }
    return this.userRepository.remove(user)

  }
} 