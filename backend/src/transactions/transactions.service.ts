import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export type ListTransactionsParams = {
  limit?: number;
  cursorId?: string;
};

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async listTransactions(
    params: ListTransactionsParams,
  ): Promise<Transaction[]> {
    const limit = params.limit ?? 20;
    const take = Math.min(Math.max(limit, 1), 100);

    const args: Prisma.TransactionFindManyArgs = {
      orderBy: { createdAt: 'desc' },
      take,
    };

    if (params.cursorId) {
      args.cursor = { id: params.cursorId };
      args.skip = 1;
    }

    return this.prisma.transaction.findMany(args);
  }
}
