import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Post as BlogPost } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Tag } from '../entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost) private readonly postRepository: Repository<BlogPost>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createDto: CreatePostDto, authorId: number): Promise<BlogPost> {
    const post = new BlogPost();
    post.title = createDto.title;
    post.content = createDto.content;

    if (authorId) {
      const author = await this.userRepository.findOne({ where: { id: authorId } });
      post.author = author ?? null;
    }

    if (createDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: createDto.categoryId } });
      post.category = category ?? null;
    }

    if (createDto.tagIds && createDto.tagIds.length > 0) {
      const tags = await this.tagRepository.find({ where: { id: In(createDto.tagIds) } });
      post.tags = tags;
    }

    return await this.postRepository.save(post);
  }

  async findAll(): Promise<BlogPost[]> {
    /**
     * 这里为啥不返回【comments】和【files】，是因为体量可能比较大
     */
    return await this.postRepository.find({
      relations: ['author', 'category', 'tags'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'tags', 'comments', 'files'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updateDto: UpdatePostDto): Promise<BlogPost> {
    const post = await this.findOne(id);

    if (typeof updateDto.title !== 'undefined') {
      post.title = updateDto.title!;
    }
    if (typeof updateDto.content !== 'undefined') {
      post.content = updateDto.content!;
    }

    if (typeof updateDto.categoryId !== 'undefined') {
      if (updateDto.categoryId === null) {
        post.category = null;
      } else if (typeof updateDto.categoryId === 'number') {
        const category = await this.categoryRepository.findOne({ where: { id: updateDto.categoryId } });
        console.log( updateDto.categoryId, '121212');
        
        post.category = category ?? null;
      }
    }

    if (typeof updateDto.tagIds !== 'undefined') {
      if (!updateDto.tagIds || updateDto.tagIds.length === 0) {
        post.tags = [];
      } else {
        const tags = await this.tagRepository.find({ where: { id: In(updateDto.tagIds) } });
        post.tags = tags;
      }
    }

    return await this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
} 