
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity'; // Import any entity needed for the scan

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rimacare',
    password: '1234',
    database: 'rimacare_db',
    entities: [User], 
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false, 
    logging: true,
});