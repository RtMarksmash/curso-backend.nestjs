import { Type } from 'class-transformer';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, ValidateNested } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}
