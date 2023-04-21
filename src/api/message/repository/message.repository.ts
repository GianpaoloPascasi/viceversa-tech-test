import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Injectable()
export class MessageRepository {
  private logger: Logger = new Logger(MessageRepository.name);

  constructor(
    @InjectRepository(MessageEntity)
    public messagesRepository: Repository<MessageEntity>,
  ) {}

  async bulkCreateMessages(user: UserEntity, messages: Array<string>) {
    const queries = messages.map(async (m) => {
      const msg = new MessageEntity(m);
      msg.user = user;
      await msg.save();
      return msg;
    });
    const result = await Promise.all(queries);
    return result;
  }
}
