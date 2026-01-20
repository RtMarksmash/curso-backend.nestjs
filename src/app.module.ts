import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './env.model';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigService: ConfigService<Env>) => ({
        type: 'postgres',
        host: ConfigService.get('POSTGRES_HOST', { infer: true }),
        port: ConfigService.get('POSTGRES_PORT', { infer: true }),
        username: ConfigService.get('POSTGRES_USER', { infer: true }),
        password: ConfigService.get('POSTGRES_PASSWORD', { infer: true }),
        database: ConfigService.get('POSTGRES_DB', { infer: true }),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    AiModule,
  ],
})
export class AppModule {}
