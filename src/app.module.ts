import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['env.local', 'env.development', 'env'] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'my_blog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 这个加上才能识别实体，才能创建表
      autoLoadEntities: true, // ??
      synchronize: true, //??
      timezone: 'Z', //??
      charset: 'utf8mb4_unicode_ci', // ??
    }),
    UsersModule, 
    /**
     * // UsersModule要想使用鉴权模块AuthModule
     * 
     * 1. AuthModule必须要导出自身
     * 2. app.module.ts中import AuthModule
     * 
     */
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
