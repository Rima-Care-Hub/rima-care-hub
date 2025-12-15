import { 
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './constants';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Request() req: ExpressRequest & { user: { username: string, id: number, role: string}}) {
        return this.authService.login(req.user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: ExpressRequest & { user: { userId: number, username: string, role: string }}) {
        return req.user;
    }

}
