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
import { isDbEnabled } from './common/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(isDbEnabled()
      ? [
          TypeOrmModule.forRoot({
            type: 'postgres',
            ...(process.env.DATABASE_URL
              ? { url: process.env.DATABASE_URL }
              : {
                  host: process.env.DB_HOST,
                  port: parseInt(process.env.DB_PORT || '5432', 10),
                  username: process.env.DB_USERNAME || 'postgres',
                  password: process.env.DB_PASSWORD || 'postgres',
                  database: process.env.DB_DATABASE || 'rimacare_db',
                }),
            entities: [User],
            synchronize: process.env.NODE_ENV === 'development',
            autoLoadEntities: true,
            retryAttempts: 0,
            retryDelay: 0,
          }),
        ]
      : []),
    ...(isDbEnabled() ? [AuthModule, UsersModule] : []),
    PaymentsModule,
    WebhooksModule,
    TransactionsModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
