import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { Post as BlogPost } from '../entities/post.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>,
    @InjectRepository(BlogPost) private readonly postRepository: Repository<BlogPost>,
  ) {}

  async attachToPost(postId: number, files: Express.Multer.File[]): Promise<FileEntity[]> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const entities: FileEntity[] = files.map((file) => {
      const entity = new FileEntity();
      entity.filename = file.filename;
      entity.mimeType = file.mimetype;
      entity.size = String(file.size);
      entity.url = `/uploads/${file.filename}`;
      entity.post = post;
      return entity;
    });

    return await this.fileRepository.save(entities);
  }
} 