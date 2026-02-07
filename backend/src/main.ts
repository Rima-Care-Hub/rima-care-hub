import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { seedUser } from './users/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Seed admin user if not exists
  const dataSource = app.get(DataSource);
  await seedUser(dataSource);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
