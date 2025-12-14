import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        // Assume findByUsername returns a User entity that includes the 'role' property
        const user = await this.usersService.findByUsername(username); 
        if (!user) return null;

        const passwordMatches = await bcrypt.compare(pass, user.password || '');
        if (user && passwordMatches) {
            // It's important that the 'role' property is included in the returned object
            const { password, ...result } = user;
            return result; 
        }
        return null;
    }

    async login(user: any) {
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