import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isPrismaEnabled } from '../common/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient | null = null;

  getClient(): PrismaClient {
    if (!this.client) {
      throw new ServiceUnavailableException({
        code: 'DB_DISABLED',
        message: 'DB not configured',
      });
    }
    return this.client;
  }

  async onModuleInit() {
    if (!isPrismaEnabled()) {
      this.client = null;
      return;
    }

    this.client = new PrismaClient();
    await this.client.$connect();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.$disconnect();
      this.client = null;
    }
  }
}
