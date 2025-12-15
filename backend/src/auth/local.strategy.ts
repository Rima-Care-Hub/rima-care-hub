import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: AuthService) {
    super();
  }


  async validate(username: string, password: string): Promise<{ userId?: number, username: string, role: string}> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
        return { userId: (user as any).id, username: user.username, role: user.role };
  }
}