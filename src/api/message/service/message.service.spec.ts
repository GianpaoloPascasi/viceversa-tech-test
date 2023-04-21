import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../../../data-source';
import { AuthModule } from '../../auth/auth.module';
import { MessageController } from '../controller/message.controller';
import { MessageEventEntity } from '../entity/message-event.entity';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { MessageRepository } from '../repository/message.repository';
import { MessageService } from './message.service';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/service/user.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { setTimeoutPromise } from '../../../utils/timers.promise';

describe('MessageService', () => {
  let service: MessageService;
  let userService: UserService;

  const user = 'test@test.com';
  const user1 = 'test1@test.com';
  const firstMessage = 'test';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, MessageRepository],
      controllers: [MessageController],
      imports: [
        TypeOrmModule.forRoot(dataSourceConfig),
        TypeOrmModule.forFeature([
          MessageEntity,
          UserEntity,
          MessageEventEntity,
        ]),
        AuthModule,
        UserModule,
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    userService = module.get<UserService>(UserService);
    await userService.createOrUpdate(user, 'test');
    await userService.createOrUpdate(user1, 'test');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a message', async () => {
    const operation = await service.addMessages({
      messages: [firstMessage],
      user,
    });
    expect(operation.code).toBe(200);
    expect(operation.data.user).toBe(user);
    expect(operation.data.messages.length).toBe(1);
    expect(operation.data.messages[0].message).toBe(firstMessage);
  });

  it('should have sent emails', async () => {
    await setTimeoutPromise(1500);
    const operation = await service.getMessages(user);
    expect(operation.data[0].events.length).toBeGreaterThan(0);
  });

  it('should retrieve last user message', async () => {
    const operation = await service.getMessages(user);
    expect(operation.data.length).toBe(1);
    expect(operation.data[0].message).toBe(firstMessage);
  });

  it('should not allow double sending', async () => {
    await service.addMessages({
      messages: ['Hello friend'],
      user,
    });
    await expect(
      service.addMessages({
        messages: ['Hello Mario'],
        user,
      }),
    ).rejects.toThrow();
  });

  it('should check unique messages for different users', async () => {
    await expect(
      service.addMessages({
        messages: ['Hello Mario'],
        user: user1,
      }),
    ).resolves.not.toThrow();
    await expect(
      service.addMessages({
        messages: ['Hello Mario'],
        user: user1,
      }),
    ).rejects.toThrow();
  });
});
