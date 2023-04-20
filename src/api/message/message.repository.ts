import { Injectable } from '@nestjs/common';
import { UserMessage } from '../../models/user-message.model';

@Injectable()
export class MessageRepository {
  data: Array<UserMessage> = new Array<UserMessage>();

  createOrUpdate(user: string, messages: Array<string>) {
    const found = this.findByEmail(user);
    if (!found) {
      const newUser = new UserMessage(user, messages);
      this.data.push(newUser);
      return newUser;
    }
    found.pushMessages(messages);
    return found;
  }

  findByEmail(user: string) {
    return this.data.find((u) => u.user === user);
  }
}
