import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { PrismaService } from '../prisma/prisma.service';
import { CommissionService } from '../payments/commission.service';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [WalletsModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, PrismaService, CommissionService],
})
export class WebhooksModule {}
