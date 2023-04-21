import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../../../data-source';
import { AuthModule } from '../../auth/auth.module';
import { MessageController } from '../controller/message.controller';
import { MessageEventEntity } from '../entity/message-event.entity';
import { MessageEntity } from '../entity/message.entity';
import { UserMessagesEntity } from '../entity/user-message.entity';
import { MessageRepository } from '../repository/message.repository';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, MessageRepository],
      controllers: [MessageController],
      imports: [
        TypeOrmModule.forRoot(dataSourceConfig),
        TypeOrmModule.forFeature([
          MessageEntity,
          UserMessagesEntity,
          MessageEventEntity,
        ]),
        AuthModule,
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const user = 'test@test.com';
  const firstMessage = 'test';
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

  it('should retrieve last user message', async () => {
    await service.addMessages({
      messages: [firstMessage],
      user,
    });
    const operation = await service.getMessages(user);
    expect(operation.data.length).toBe(1);
    expect(operation.data[0].message).toBe(firstMessage);
  });
});
