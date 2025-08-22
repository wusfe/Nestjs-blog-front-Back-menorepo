import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user: User) => user.comments, { onDelete: 'SET NULL', nullable: true })
  user: User | null;
} 