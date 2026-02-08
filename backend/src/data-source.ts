import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.DATABASE_URL?.replace(/^file:/, '') || 'database.sqlite',
  entities: [User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
