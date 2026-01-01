import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletsService, OwnerTypeInput } from './wallets.service';

function normalizeOwnerTypeParam(param: string): OwnerTypeInput {
  if (param === 'platform') return 'platform';
  if (param === 'caregiver') return 'caregiver';
  return 'agency';
}

@Controller('wallets')
export class WalletsController {
  constructor(private readonly wallets: WalletsService) {}

  @Get(':ownerType/:ownerId')
  async getWallet(
    @Param('ownerType') ownerTypeParam: string,
    @Param('ownerId') ownerId: string,
  ) {
    const ownerType = normalizeOwnerTypeParam(ownerTypeParam);
    const result = await this.wallets.getWalletWithSummary(ownerType, ownerId, 'NGN');
    const payouts = await this.wallets.listPayoutRequestsForWallet(result.wallet.id);

    return {
      wallet: result.wallet,
      summary: result.summary,
      payouts,
    };
  }

  @Get(':ownerType/:ownerId/payouts')
  async listPayouts(
    @Param('ownerType') ownerTypeParam: string,
    @Param('ownerId') ownerId: string,
  ) {
    const ownerType = normalizeOwnerTypeParam(ownerTypeParam);
    const { wallet } = await this.wallets.getWalletWithSummary(ownerType, ownerId, 'NGN');
    const payouts = await this.wallets.listPayoutRequestsForWallet(wallet.id);
    return { walletId: wallet.id, payouts };
  }

  @Post(':ownerType/:ownerId/payouts')
  async createPayout(
    @Param('ownerType') ownerTypeParam: string,
    @Param('ownerId') ownerId: string,
    @Body('amountMinor') amountMinor: number,
  ) {
    const ownerType = normalizeOwnerTypeParam(ownerTypeParam);
    const payout = await this.wallets.createPayoutRequestForOwner({
      ownerType,
      ownerId,
      amountMinor,
    });
    return payout;
  }
}
