import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy',
        },
      },
    });
  }

  async onModuleInit() {
    if (process.env.DATABASE_URL) {
      await this.$connect();
    }
  }
}
