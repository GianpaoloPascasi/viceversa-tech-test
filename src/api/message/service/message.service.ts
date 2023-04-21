import { Injectable } from '@nestjs/common';
import { AddMessagesBody } from '../../../model/message/add.model';
import { Response } from '../../../model/response.model';
import { MessageEntity } from '../entity/message.entity';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  async addMessages(body: AddMessagesBody): Promise<Response<null>> {
    await this.repository.createOrUpdate(body.user, body.messages);
    return {
      code: 200,
      data: null,
      msg: 'ok',
    };
  }
  async getMessages(email: string): Promise<Response<Array<MessageEntity>>> {
    const user = await this.repository.findByEmail(email);
    return {
      code: 200,
      msg: 'ok',
      data: await user.messages,
    };
  }
}
