import { Injectable } from '@nestjs/common'

export type CommissionConfig = {
  ratePercent: number
  minFeeMinor: number
}

export type CommissionResult = {
  grossMinor: number
  feeMinor: number
  netMinor: number
  ratePercent: number
  minFeeMinor: number
}

const DEFAULT_CONFIG: CommissionConfig = {
  ratePercent: 10,
  minFeeMinor: 10000,
}

@Injectable()
export class CommissionService {
  compute(amountMinor: number, config: CommissionConfig = DEFAULT_CONFIG): CommissionResult {
    if (amountMinor <= 0) {
      return {
        grossMinor: amountMinor,
        feeMinor: 0,
        netMinor: 0,
        ratePercent: config.ratePercent,
        minFeeMinor: config.minFeeMinor,
      }
    }

    const percentFee = Math.floor((amountMinor * config.ratePercent) / 100)
    const feeMinor = Math.max(percentFee, config.minFeeMinor)
    const netMinor = Math.max(amountMinor - feeMinor, 0)

    return {
      grossMinor: amountMinor,
      feeMinor,
      netMinor,
      ratePercent: config.ratePercent,
      minFeeMinor: config.minFeeMinor,
    }
  }
}
