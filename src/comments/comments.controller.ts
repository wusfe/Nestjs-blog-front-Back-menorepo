import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post as HttpPost, Query, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async list(@Query('postId') postId?: string) {
    if (postId) {
      const id = Number(postId);
      return await this.commentsService.findAllByPost(id);
    }
    return await this.commentsService.findAll();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() dto: CreateCommentDto, @Req() req: any) {
    const userId = req?.user?.userId;
    return await this.commentsService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) {
    return await this.commentsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.remove(id);
    return { success: true };
  }
} 