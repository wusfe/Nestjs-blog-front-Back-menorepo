import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  
  // 很关键的一步：全局管道在整个应用程序中使用，适用于每个控制器和每个路由处理程序
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // useGlobalGuards

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
