import { Module } from '@nestjs/common';
import { PostsService } from '../posts/services/posts.service';
import { PostsController } from '../posts/controllers/posts.controller';
import { CategoriesService } from '../posts/services/categories.service';
import { CategoriesController } from '../posts/controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), AiModule],
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService],
  exports: [PostsService, CategoriesService],
})
export class PostsModule {}
