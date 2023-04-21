import { Controller, Get, Post } from '@nestjs/common';
import { AddMessagesBody } from '../../../model/message/add.model';
import { UserSession } from '../../auth/user-session/user-session';
import { MessageService } from '../service/message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly session: UserSession,
  ) {}

  @Post('add-messages')
  addMessages(body: AddMessagesBody) {
    return this.messageService.addMessages(body);
  }

  @Get('messages')
  messages() {
    return this.messageService.getMessages(this.session.email);
  }
}
