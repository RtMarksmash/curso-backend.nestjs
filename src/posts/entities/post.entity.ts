import { User } from '../../users/entitites/user.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'The content of the post', required: false })
  content: string;

  @Column({ type: 'varchar', length: 900, name: 'cover_image', nullable: true })
  @ApiProperty({ description: 'The cover image URL of the post', required: false })
  coverImage: string;

  @Column({ type: 'varchar', length: 255, name: 'summary', nullable: true })
  @ApiProperty({ description: 'The summary of the post', required: false })
  summary: string;

  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  @ApiProperty({ description: 'Whether the post is a draft or not', default: true })
  isDraft: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  @ApiProperty({ description: 'The creation date of the post' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
