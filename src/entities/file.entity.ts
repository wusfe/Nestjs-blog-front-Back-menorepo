import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ name: 'mime_type', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: string;

  @Column({ length: 500 })
  url: string;

  @ManyToOne(() => Post, (post: Post) => post.files, { onDelete: 'CASCADE' })
  post: Post;
} 