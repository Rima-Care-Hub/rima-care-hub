import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service'; 
import { Request as ExpressRequest } from 'express';


@Controller()
export class AppController {
    static getHello(): any {
      throw new Error('Method not implemented.');
    }
    constructor(
        private appService: AppService 
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
    

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: ExpressRequest & { user: { userId: number, username: string, role: string }}) {
        return req.user;
    }
}