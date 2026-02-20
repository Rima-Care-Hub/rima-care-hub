import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/constants';
import { isDbEnabled, isPrismaEnabled } from './common/db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @Public()
  health() {
    const dbEnabled = isDbEnabled();
    const prismaEnabled = isPrismaEnabled();
    return {
      version: process.env.npm_package_version ?? 'unknown',
      dbEnabled,
      prismaEnabled,
    };
  }
}
