import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AddMessagesBody } from '../../../model/message/add.model';
import { Response } from '../../../model/response.model';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { MessageRepository } from '../repository/message.repository';
import { UserService } from '../../user/service/user.service';
import { interval } from 'rxjs';

@Injectable()
export class MessageService {
  private logger: Logger = new Logger(MessageService.name);

  constructor(
    private readonly repository: MessageRepository,
    private userService: UserService,
  ) {}

  async addMessages(body: AddMessagesBody): Promise<Response<UserEntity>> {
    const user = await this.userService.findByEmail(body.user, true);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.messages.some((msg) => !msg.notified)) {
      throw new UnprocessableEntityException(
        'Some messages are still in queue',
      );
    }
    const messagesToNotify = await this.repository.bulkCreateMessages(
      user,
      body.messages,
    );
    const withMessages = await this.userService.findByEmail(body.user, true);
    setTimeout(() => this.sendEmail(messagesToNotify), 1000);
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

  async sendEmail(messagesToNotify: Array<MessageEntity>) {
    for (const msg of messagesToNotify) {
      this.logger.log(`email sent to ${msg.user.user} with ${msg.message}`);
      await msg.sendEmail();
    }
  }
}
