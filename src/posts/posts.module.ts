import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as BlogPost } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Tag } from '../entities/tag.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

// forwardRef 避免依赖循环
@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, User, Category, Tag]), forwardRef(() => UsersModule) , FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {} 