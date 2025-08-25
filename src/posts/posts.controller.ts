import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post as HttpPost, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async list() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() dto: CreatePostDto, @Req() req: any) {
    const authorId = req?.user?.userId;
    return await this.postsService.create(dto, authorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return await this.postsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.remove(id);
    return { success: true };
  }
} 