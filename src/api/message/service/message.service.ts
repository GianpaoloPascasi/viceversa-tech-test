import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { AddMessagesBody } from '../../../model/message/add.model';
import { Response } from '../../../model/response.model';
import { MessageEntity } from '../entity/message.entity';
import { UserMessagesEntity } from '../entity/user-message.entity';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  async addMessages(
    body: AddMessagesBody,
  ): Promise<Response<UserMessagesEntity>> {
    const user = await this.repository.createOrUpdate(body.user, body.messages);
    await user.messages;
    return {
      code: 200,
      data: user,
      msg: 'ok',
    };
  }
  async getMessages(email: string): Promise<Response<Array<MessageEntity>>> {
    const user = await this.repository.findByEmail(email, true);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.messages;
    return {
      code: 200,
      msg: 'ok',
      data: user.messages,
    };
  }
}
