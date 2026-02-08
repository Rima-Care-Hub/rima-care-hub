import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

export async function seedUser(dataSource: DataSource) {
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !email || !password) {
    return;
  }

  const userRepo = dataSource.getRepository(User);
  const existing = await userRepo.findOne({ where: { username } });
  if (existing) return;

  const user = new User();
  user.firstName = 'Admin';
  user.lastName = 'User';
  user.username = username;
  user.email = email;
  user.role = UserRole.admin;
  user.isActive = true;
  user.password = await bcrypt.hash(password, 10);

  await userRepo.save(user);
  console.log('Seeded admin user');
}
