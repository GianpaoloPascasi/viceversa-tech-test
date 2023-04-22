import { Test, TestingModule } from '@nestjs/testing';
import { UserSession } from '../../auth/user-session/user-session';
import { MessageService } from '../service/message.service';
import { MessageController } from './message.controller';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [UserSession],
    })
      .useMocker((token) => {
        if (token === MessageService) {
          return {
            addMessages: () =>
              jest.fn().mockResolvedValue({
                user: 'test',
                messages: [],
              }),
            getMessages: () => jest.fn().mockResolvedValue([]),
          };
        }
      })
      .compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
