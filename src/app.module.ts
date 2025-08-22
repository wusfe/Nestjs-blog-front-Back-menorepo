import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      autoLoadEntities: true, // ??
      synchronize: true, //??
      timezone: 'Z', //??
      charset: 'utf8mb4_unicode_ci', // ??
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
