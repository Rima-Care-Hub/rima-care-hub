import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

export async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const existing = await userRepo.findOne({ where: { username: 'admin' } });
  if (existing) return;

  const user = new User();
  user.firstName = 'Admin';
  user.lastName = 'User';
  user.username = 'admin';
  user.email = 'admin@rimacare.test';
  user.role = UserRole.admin;
  user.isActive = true;
  user.password = await bcrypt.hash('admin123', 10);

  await userRepo.save(user);
  console.log('Seeded admin user (admin / admin123)');
}
