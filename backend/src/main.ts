import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // FIX: Import ValidationPipe
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // FIX: Apply a global ValidationPipe to enforce DTO validation (as per task requirement)
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTO
      forbidNonWhitelisted: true, // Throw an error if extra properties are sent
      transform: true, // Automatically convert payloads to DTO instances
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
