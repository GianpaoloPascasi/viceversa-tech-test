import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../entity/message.entity';
import { UserMessagesEntity } from '../entity/user-message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(UserMessagesEntity)
    public userMessagesRepository: Repository<UserMessagesEntity>, // public because we can get it and do custom queries if needed anywhere
  ) {}

  async createOrUpdate(user: string, messages: Array<string>) {
    const found = await this.findByEmail(user);
    if (!found) {
      const newUser = new UserMessagesEntity(user);
      await newUser.save();
      await this.pushMessages(newUser, messages);
      return newUser;
    }
    this.pushMessages(found, messages);
    return found;
  }

  async findByEmail(user: string) {
    return this.userMessagesRepository.findOneBy({ user });
  }

  async pushMessages(user: UserMessagesEntity, messages: Array<string>) {
    user.messages.push(...messages.map((m) => new MessageEntity(m)));
    await this.userMessagesRepository.save(user);
  }
}
