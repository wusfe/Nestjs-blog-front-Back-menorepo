import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as BlogPost } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Tag } from '../entities/tag.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, User, Category, Tag])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {} 