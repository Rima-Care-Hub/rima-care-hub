import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PayoutRequest,
  PayoutStatus,
  SellerType,
  Wallet,
  WalletOwnerType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export type OwnerTypeInput = 'platform' | 'agency' | 'caregiver';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeOwnerType(
    ownerType: WalletOwnerType | SellerType | OwnerTypeInput,
  ): WalletOwnerType {
    const raw = String(ownerType);

    if (raw === 'platform') {
      return WalletOwnerType.platform;
    }

    if (raw === 'caregiver') {
      return WalletOwnerType.caregiver;
    }

    return WalletOwnerType.agency;
  }

  async getOrCreateWallet(
    ownerType: WalletOwnerType | SellerType | OwnerTypeInput,
    ownerId: string,
    currency = 'NGN',
  ): Promise<Wallet> {
    const normalized = this.normalizeOwnerType(ownerType);
    return this.prisma.wallet.upsert({
      where: {
        ownerType_ownerId_currency: {
          ownerType: normalized,
          ownerId,
          currency,
        },
      },
      create: {
        ownerType: normalized,
        ownerId,
        currency,
        balanceMinor: 0,
      },
      update: {},
    });
  }

  async applyPaymentSettlement(args: {
    transactionId: string;
    sellerType: SellerType;
    sellerId: string;
    currency: string;
    platformFeeMinor: number;
    netAmountMinor: number;
  }): Promise<void> {
    const {
      transactionId,
      sellerType,
      sellerId,
      currency,
      platformFeeMinor,
      netAmountMinor,
    } = args;

    await this.prisma.$transaction(async (tx) => {
      if (platformFeeMinor > 0) {
        const platformWallet = await tx.wallet.upsert({
          where: {
            ownerType_ownerId_currency: {
              ownerType: WalletOwnerType.platform,
              ownerId: 'platform',
              currency,
            },
          },
          create: {
            ownerType: WalletOwnerType.platform,
            ownerId: 'platform',
            currency,
            balanceMinor: 0,
          },
          update: {},
        });

        const newBalance = platformWallet.balanceMinor + platformFeeMinor;

        await tx.wallet.update({
          where: { id: platformWallet.id },
          data: { balanceMinor: newBalance },
        });

        await tx.ledgerEntry.create({
          data: {
            walletId: platformWallet.id,
            transactionId,
            amountMinor: platformFeeMinor,
            balanceAfterMinor: newBalance,
            description: 'Platform fee from Paystack payment',
          },
        });
      }

      if (netAmountMinor > 0) {
        const ownerType =
          sellerType === SellerType.caregiver
            ? WalletOwnerType.caregiver
            : WalletOwnerType.agency;

        const sellerWallet = await tx.wallet.upsert({
          where: {
            ownerType_ownerId_currency: {
              ownerType,
              ownerId: sellerId,
              currency,
            },
          },
          create: {
            ownerType,
            ownerId: sellerId,
            currency,
            balanceMinor: 0,
          },
          update: {},
        });

        const newBalance = sellerWallet.balanceMinor + netAmountMinor;

        await tx.wallet.update({
          where: { id: sellerWallet.id },
          data: { balanceMinor: newBalance },
        });

        await tx.ledgerEntry.create({
          data: {
            walletId: sellerWallet.id,
            transactionId,
            amountMinor: netAmountMinor,
            balanceAfterMinor: newBalance,
            description: 'Net payout from Paystack payment',
          },
        });
      }
    });
  }

  async getWalletWithSummary(
    ownerType: WalletOwnerType | SellerType | OwnerTypeInput,
    ownerId: string,
    currency = 'NGN',
  ) {
    const wallet = await this.getOrCreateWallet(ownerType, ownerId, currency);

    const pendingPayoutTotal = await this.prisma.payoutRequest.aggregate({
      where: {
        walletId: wallet.id,
        status: PayoutStatus.pending,
      },
      _sum: {
        amountMinor: true,
      },
    });

    return {
      wallet,
      summary: {
        pendingPayoutMinor: pendingPayoutTotal._sum.amountMinor ?? 0,
      },
    };
  }

  async listPayoutRequestsForWallet(
    walletId: string,
  ): Promise<PayoutRequest[]> {
    return this.prisma.payoutRequest.findMany({
      where: { walletId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async createPayoutRequestForOwner(args: {
    ownerType: WalletOwnerType | SellerType | OwnerTypeInput;
    ownerId: string;
    currency?: string;
    amountMinor: number;
  }): Promise<PayoutRequest> {
    const { ownerType, ownerId, currency = 'NGN', amountMinor } = args;

    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      throw new BadRequestException('amountMinor must be a positive integer');
    }

    const { wallet } = await this.getWalletWithSummary(
      ownerType,
      ownerId,
      currency,
    );

    if (amountMinor > wallet.balanceMinor) {
      throw new BadRequestException(
        'amountMinor exceeds available wallet balance',
      );
    }

    return this.prisma.payoutRequest.create({
      data: {
        walletId: wallet.id,
        amountMinor,
        status: PayoutStatus.pending,
      },
    });
  }
}
