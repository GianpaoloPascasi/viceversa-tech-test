import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { AddMessagesBody } from '../../../model/message/add.model';
import { Response } from '../../../model/response.model';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { MessageRepository } from '../repository/message.repository';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly repository: MessageRepository,
    private userService: UserService,
  ) {}

  async addMessages(body: AddMessagesBody): Promise<Response<UserEntity>> {
    const user = await this.userService.findByEmail(body.user, true);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repository.bulkCreateMessages(user, body.messages);
    const withMessages = await this.userService.findByEmail(body.user, true);
    return {
      code: 200,
      data: withMessages,
      msg: 'ok',
    };
  }
  async getMessages(email: string): Promise<Response<Array<MessageEntity>>> {
    const user = await this.userService.findByEmail(email, true);
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
