import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.DATABASE_URL?.replace(/^file:/, '') || 'database.sqlite',
      entities: [User],
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PaymentsModule,
    WebhooksModule,
    TransactionsModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
