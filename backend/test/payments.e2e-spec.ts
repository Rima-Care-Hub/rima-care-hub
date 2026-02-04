import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Payments (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payments/session (POST) returns mock authorization url', async () => {
    const res = await request(app.getHttpServer())
      .post('/payments/session')
      .send({
        amount_minor: 50000,
        sellerType: 'agency',
        sellerId: 'test-agency-1',
      })
      .expect(200);

    const body = res.body as {
      reference: string;
      authorization_url: string;
      status: string;
    };

    expect(body).toHaveProperty('reference');
    expect(body).toHaveProperty('authorization_url');
    expect(body.status).toBe('pending');
  });
});
