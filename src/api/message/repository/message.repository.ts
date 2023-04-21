import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entity/message.entity';
import { UserMessagesEntity } from '../entity/user-message.entity';

@Injectable()
export class MessageRepository {
  private logger: Logger = new Logger(MessageRepository.name);

  constructor(
    @InjectRepository(UserMessagesEntity)
    public userMessagesRepository: Repository<UserMessagesEntity>, // public because we can get it and do custom queries if needed anywhere
    @InjectRepository(MessageEntity)
    public messagesRepository: Repository<MessageEntity>,
  ) {}

  async createOrUpdate(user: string, messages: Array<string>) {
    let found = await this.findByEmail(user);
    if (!found) {
      found = new UserMessagesEntity(user);
      await found.save();
    }
    await this.bulkCreateMessages(found, messages);
    return this.findByEmail(user, true);
  }

  async findByEmail(user: string, fetchMessages = false) {
    return this.userMessagesRepository.findOne({
      where: { user },
      relations: { messages: fetchMessages },
    });
  }

  async bulkCreateMessages(user: UserMessagesEntity, messages: Array<string>) {
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
