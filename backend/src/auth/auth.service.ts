import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username); 
        if (!user) return null;

        const passwordMatches = await bcrypt.compare(pass, user.password || '');
        if (user && passwordMatches) {
            return { id: user.id, username: user.username, role: user.role}; 
        }
        return null;
    }

    login(user: { username: string, id: number, role: string}) {
        const payload = { 
            username: user.username, 
            sub: user.id,
            role: user.role
        };
        
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}