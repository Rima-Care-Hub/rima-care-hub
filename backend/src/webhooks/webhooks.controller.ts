import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WebhooksService, PaystackWebhookPayload } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('paystack')
  @HttpCode(HttpStatus.OK)
  handlePaystack(
    @Headers() headers: Record<string, string>,
    @Body() body: PaystackWebhookPayload,
  ) {
    return this.webhooksService.handlePaystackWebhook(headers, body);
  }
}
