import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  PaymentStatus,
  Prisma,
  SellerType,
  TransactionStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CommissionService } from '../payments/commission.service';
import { WalletsService } from '../wallets/wallets.service';

export type PaystackWebhookData = {
  id?: string | number;
  reference?: string;
  amount?: number;
  currency?: string;
  status?: string;
  metadata?: {
    sellerType?: string;
    sellerId?: string;
  } & Record<string, unknown>;
} & Record<string, unknown>;

export type PaystackWebhookPayload = {
  event?: string;
  data?: PaystackWebhookData;
} & Record<string, unknown>;

@Injectable()
export class WebhooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commission: CommissionService,
    private readonly wallets: WalletsService,
  ) {}

  async handlePaystackWebhook(
    headers: Record<string, string>,
    body: PaystackWebhookPayload,
  ) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return { ok: false, reason: 'paystack_secret_not_configured' };
    }

    const signature =
      headers['x-paystack-signature'] ||
      headers['X-Paystack-Signature'] ||
      (headers['x-Paystack-Signature'] as string | undefined) ||
      '';

    const payload = JSON.stringify(body ?? {});
    const expected = crypto
      .createHmac('sha512', secret)
      .update(payload)
      .digest('hex');

    if (!signature || signature !== expected) {
      // Ignore silently but return ok=false so we can inspect logs if needed
      return { ok: false, ignored: true, reason: 'invalid_signature' };
    }

    const eventType = body.event ?? 'unknown';
    const data: PaystackWebhookData = body.data ?? {};
    const reference = data.reference ?? null;

    const uniqueKey = `${eventType}:${data.id ?? reference ?? ''}`;
    const hash = crypto
      .createHash('sha256')
      .update(uniqueKey || payload)
      .digest('hex');

    // Idempotency: store webhook event; if duplicate hash, just return
    try {
      await this.prisma.webhookEvent.create({
        data: {
          provider: 'paystack',
          eventType,
          signature,
          body: body as unknown as Prisma.InputJsonValue,
          hash,
        },
      });
    } catch (e: any) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return { ok: true, duplicate: true };
      }
      throw e;
    }

    if (!reference) {
      return { ok: true, processed: false, reason: 'no_reference' };
    }

    const amountMinor = typeof data.amount === 'number' ? data.amount : 0;
    const currency = data.currency ?? 'NGN';
    const metadata = (data.metadata ?? {}) as {
      sellerType?: string;
      sellerId?: string;
    } & Record<string, unknown>;

    const sellerTypeRaw =
      metadata.sellerType === 'caregiver' ? 'caregiver' : 'agency';
    const sellerType = sellerTypeRaw as SellerType;
    const sellerId = metadata.sellerId ?? 'unknown';

    const statusRaw = data.status ?? '';
    const txStatus: TransactionStatus =
      statusRaw === 'success'
        ? TransactionStatus.success
        : statusRaw === 'failed'
          ? TransactionStatus.failed
          : TransactionStatus.pending;

    const paymentStatus: PaymentStatus =
      statusRaw === 'success'
        ? PaymentStatus.paid
        : statusRaw === 'failed'
          ? PaymentStatus.failed
          : PaymentStatus.pending;

    const commission =
      txStatus === TransactionStatus.success && amountMinor > 0
        ? this.commission.compute(amountMinor)
        : { grossMinor: amountMinor, feeMinor: 0, netMinor: 0 };

    await this.prisma.paymentSession.upsert({
      where: { reference },
      create: {
        reference,
        amountMinor,
        currency,
        sellerType,
        sellerId,
        status: paymentStatus,
        metadata: metadata as unknown as Prisma.InputJsonValue,
        provider: 'paystack',
      },
      update: {
        amountMinor,
        currency,
        sellerType,
        sellerId,
        status: paymentStatus,
        metadata: metadata as unknown as Prisma.InputJsonValue,
      },
    });

    const tx = await this.prisma.transaction.upsert({
      where: { reference },
      create: {
        reference,
        amountMinor,
        platformFeeMinor: commission.feeMinor,
        netAmountMinor: commission.netMinor,
        currency,
        sellerType,
        sellerId,
        status: txStatus,
        provider: 'paystack',
      },
      update: {
        amountMinor,
        platformFeeMinor: commission.feeMinor,
        netAmountMinor: commission.netMinor,
        currency,
        sellerType,
        sellerId,
        status: txStatus,
      },
    });

    if (txStatus === TransactionStatus.success) {
      await this.wallets.applyPaymentSettlement({
        transactionId: tx.id,
        sellerType,
        sellerId,
        currency,
        platformFeeMinor: commission.feeMinor,
        netAmountMinor: commission.netMinor,
      });
    }

    return { ok: true, processed: true };
  }
}
