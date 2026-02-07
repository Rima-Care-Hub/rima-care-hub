import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        
    ) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        const saltRounds = 10;
        user.password = await bcrypt.hash(createUserDto.password, saltRounds);

        return this.usersRepository.save(user)
    }


    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // This method is used by the controller, will return null if not found
    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id});
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
                'password' 
            ]
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
                'password' 
            ]
        });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }


}