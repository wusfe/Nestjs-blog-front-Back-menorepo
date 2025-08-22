import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';
import { FileEntity } from './file.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user: User) => user.posts, { onDelete: 'SET NULL', nullable: true })
  author: User | null;

  @ManyToOne(() => Category, (category: Category) => category.posts, { onDelete: 'SET NULL', nullable: true })
  category: Category | null;

  @ManyToMany(() => Tag, (tag: Tag) => tag.posts, { cascade: true })
  @JoinTable({ name: 'post_tags' })
  tags: Tag[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => FileEntity, (file: FileEntity) => file.post)
  files: FileEntity[];
} 