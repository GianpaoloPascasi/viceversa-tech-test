import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AddMessagesBody } from '../../../model/message/add.model';
import { UserSession } from '../../auth/user-session/user-session';
import { MessageService } from '../service/message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly session: UserSession,
  ) {}

  @ApiBody({
    type: AddMessagesBody,
  })
  @Post('add-messages')
  addMessages(@Body() body: AddMessagesBody) {
    return this.messageService.addMessages(body);
  }

  @Get('messages')
  messages() {
    return this.messageService.getMessages(this.session.user);
  }
}
