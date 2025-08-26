import { Controller, Post as HttpPost, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts/:postId/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost() // 这个是原始写法，语法糖是@Post
  @UseInterceptors(FilesInterceptor('files', 10))
  async upload(
    @Param('postId', ParseIntPipe) postId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const saved = await this.filesService.attachToPost(postId, files ?? []);
    return { success: true, files: saved };
  }
} 