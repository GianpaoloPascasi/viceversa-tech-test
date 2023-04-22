import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/api/user/service/user.service';
import { sign as jwtSign } from 'jsonwebtoken';
import { setTimeoutPromise } from '../src/utils/timers.promise';
import { MessageRepository } from '../src/api/message/repository/message.repository';
import { UserEntity } from '../src/api/user/entity/user.entity';
import { response } from 'express';

describe('MessageController (e2e)', () => {
  let app: INestApplication;
  const user = 'test@email.com';
  const messages = ['msg1', 'msg2', 'msg3', 'msg4'];
  let jwt = '';
  let userEntity: UserEntity;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const userService = app.get<UserService>(UserService);
    userEntity = await userService.createOrUpdate(user, 'pwd');
    jwt = jwtSign(
      {
        user,
      },
      process.env.JWT_SECRET ?? 'test',
      { expiresIn: '1h' },
    );
  });

  it('/api/message/add-messages (POST)', () => {
    return request(app.getHttpServer())
      .post('/message/add-messages')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        user,
        messages: [messages[0], messages[1]],
      })
      .expect(201)
      .then((response) => {
        expect(response.body.data.messages.length).toBe(2);
        expect(response.body.data.messages[0].events.length).toBe(0);
        expect(response.body.data.messages[1].events.length).toBe(0);
      });
  });

  it('should test unique messages criteria', async () => {
    await setTimeoutPromise(1500);
    return request(app.getHttpServer())
      .post('/message/add-messages')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        user,
        messages: [messages[0]],
      })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Cannot send duplicate messages');
      });
  });

  it('/api/message/messages (GET)', async () => {
    await setTimeoutPromise(1500);
    return request(app.getHttpServer())
      .get('/message/messages')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.length).toBe(2);
        expect(response.body.data[0].events.length).toBeGreaterThanOrEqual(1);
        expect(response.body.data[1].events.length).toBeGreaterThanOrEqual(1);
      });
  });

  it('should wait old messages to be notified', async () => {
    const messageRepo = app.get<MessageRepository>(MessageRepository);
    await messageRepo.bulkCreateMessages(userEntity, ['test']);
    const results = await request(app.getHttpServer())
      .post('/message/add-messages')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        user,
        messages: [messages[2]],
      });
    expect(results.statusCode).toBe(422);
    expect(results.body.message).toBe('Some messages are still in queue');
  });

  it('should not allow unauthorized users to access add and get endpoints', () => {
    request(app.getHttpServer())
      .post('/message/add-messages')
      .send({
        user,
        messages: [],
      })
      .expect(401);
    request(app.getHttpServer())
      .get('/message/messages')
      .send({
        user,
        messages: [],
      })
      .expect(401);
  });

  afterAll(() => app.close());
});
