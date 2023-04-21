import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    try {
      const queries = messages.map(async (m) => {
        const msg = new MessageEntity(m);
        msg.user = user;
        await msg.save();
        return msg;
      });
      const result = await Promise.all(queries);
      return result;
    } catch (e) {
      if (e.errno === 19) {
        throw new BadRequestException('Cannot send duplicate messages');
      }
      this.logger.debug('Cannot save messages: ' + e?.message);
      throw new UnprocessableEntityException('Cannot save messages');
    }
  }
}
