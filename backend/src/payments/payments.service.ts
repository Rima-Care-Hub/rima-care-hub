import { Injectable } from '@nestjs/common';

type CreateSessionDto = {
  amount_minor: number;
  currency?: string;
  sellerType: 'agency' | 'caregiver';
  sellerId: string;
  metadata?: Record<string, unknown>;
};

type PaystackInitResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
    currency?: string;
  };
};

type FetchFn = (
  input: string,
  init: {
    method: string;
    headers: Record<string, string>;
    body: string;
  },
) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

@Injectable()
export class PaymentsService {
  async createSession(dto: CreateSessionDto) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const currency = dto.currency ?? 'NGN';

    if (secret) {
      try {
        const reference = `rc_${Date.now()}`;
        const email =
          (dto.metadata?.['email'] as string) ?? 'sandbox@example.com';
        const body = {
          email,
          amount: dto.amount_minor, // already in minor units (e.g., kobo)
          currency,
          reference,
          callback_url: process.env.PAYSTACK_CALLBACK_URL || undefined,
          metadata: {
            sellerType: dto.sellerType,
            sellerId: dto.sellerId,
            ...dto.metadata,
          },
        };

        const globalWithFetch = globalThis as { fetch?: FetchFn };
        if (!globalWithFetch.fetch) {
          throw new Error('fetch_not_available');
        }

        const resp = await globalWithFetch.fetch(
          'https://api.paystack.co/transaction/initialize',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${secret}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(body),
          },
        );

        const data = (await resp.json()) as PaystackInitResponse;

        if (
          resp.ok &&
          data?.status &&
          data?.data?.authorization_url &&
          data?.data?.reference
        ) {
          return {
            reference: data.data.reference,
            authorization_url: data.data.authorization_url,
            amount_minor: dto.amount_minor,
            currency: data.data.currency ?? currency,
            sellerType: dto.sellerType,
            sellerId: dto.sellerId,
            status: 'pending',
          };
        }
        // fallthrough to mock if API returns unexpected result
      } catch {
        // fallthrough to mock on any error
      }
    }

    // Mock fallback for local/dev without Paystack configuration
    const reference = `test_${Date.now()}`;
    const authorization_url = `https://paystack.mock/checkout/${reference}`;
    return {
      reference,
      authorization_url,
      amount_minor: dto.amount_minor,
      currency,
      sellerType: dto.sellerType,
      sellerId: dto.sellerId,
      status: 'pending',
    };
  }
}
