import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const [existingByUsername, existingByEmail] = await Promise.all([
      this.findByUsername(createUserDto.username),
      this.findByEmail(createUserDto.email),
    ]);
    if (existingByUsername) {
      throw new ConflictException('Username already exists');
    }
    if (existingByEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const saltRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltRounds);
    const allowedRoles = [UserRole.agency, UserRole.caregiver];
    if (createUserDto.role && allowedRoles.includes(createUserDto.role)) {
      user.role = createUserDto.role;
    }

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // This method is used by the controller, will return null if not found
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      select: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'role',
        'isActive',
        'password',
      ],
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'role',
        'isActive',
        'password',
      ],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
