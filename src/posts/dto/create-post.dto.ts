import { IsString, IsOptional, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The content of the post', required: false })
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The cover image URL of the post', required: false })
  coverImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The summary of the post', required: false })
  summary?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ description: 'Array of category IDs associated with the post', required: false, type: [Number] })
  categoryIds?: number[];
}
