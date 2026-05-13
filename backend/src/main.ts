import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para Next.js
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  // Pipes Globales para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en: http://localhost:${port}`);
}
bootstrap();