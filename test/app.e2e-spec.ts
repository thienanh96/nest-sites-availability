import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AppE2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  it(`/GET sites-availability`, () => {
    return request(app.getHttpServer())
      .get('/sites-availability')
      .expect(200)
      .expect([
        'http://app.scnt.me',
        'https://gitlab.com',
        'https://github.com',
      ]);
  });

  it(`/GET sites-availability?priority=2`, () => {
    return request(app.getHttpServer())
      .get('/sites-availability?priority=4')
      .expect(200)
      .expect(['https://gitlab.com', 'https://github.com']);
  });

  afterAll(async () => {
    await app.close();
  });
});
