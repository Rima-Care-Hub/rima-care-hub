import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async listTransactions(
    @Query('limit') limitParam?: string,
    @Query('cursor') cursor?: string,
  ) {
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : undefined;
    const safeLimit =
      typeof parsedLimit === 'number' && !Number.isNaN(parsedLimit)
        ? parsedLimit
        : undefined;

    const items = await this.transactionsService.listTransactions({
      limit: safeLimit,
      cursorId: cursor,
    });

    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    return {
      data: items.map((t) => ({
        id: t.id,
        reference: t.reference,
        amountMinor: t.amountMinor,
        platformFeeMinor: t.platformFeeMinor,
        netAmountMinor: t.netAmountMinor,
        currency: t.currency,
        sellerType: t.sellerType,
        sellerId: t.sellerId,
        status: t.status,
        createdAt: t.createdAt,
      })),
      meta: {
        limit: safeLimit ?? 20,
        nextCursor,
      },
    };
  }
}
