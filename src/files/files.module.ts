import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { FileEntity } from '../entities/file.entity';
import { Post as BlogPost } from '../entities/post.entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

const uploadDestination = join(process.cwd(), 'uploads');

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, BlogPost]),
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(uploadDestination)) {
            mkdirSync(uploadDestination, { recursive: true });
          }
          cb(null, uploadDestination);
        },
        filename: (_req, file, cb) => {
          const timestamp = Date.now();
          const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          cb(null, `${timestamp}-${sanitized}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {} 