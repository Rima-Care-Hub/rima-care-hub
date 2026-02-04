import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

type CreateSessionDto = {
  amount_minor: number;
  currency?: string;
  sellerType: 'agency' | 'caregiver';
  sellerId: string;
  metadata?: Record<string, unknown>;
};

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('session')
  @HttpCode(HttpStatus.OK)
  createSession(@Body() dto: CreateSessionDto) {
    return this.payments.createSession(dto);
  }
}
