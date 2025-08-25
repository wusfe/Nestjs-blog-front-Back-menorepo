import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create({ name: dto.name });
    return await this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async update(id: number, dto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);
    if (typeof dto.name !== 'undefined') {
      tag.name = dto.name!;
    }
    return await this.tagRepository.save(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
  }
} 