import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post as HttpPost, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async list() {
    return await this.tagsService.findAll();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() dto: CreateTagDto) {
    return await this.tagsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDto) {
    return await this.tagsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tagsService.remove(id);
    return { success: true };
  }
} 