import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];
} 