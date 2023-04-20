import { Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('add-messages')
  addMessages() {
    return this.messageService.addMessages();
  }

  @Get('messages')
  messages() {
    return this.messageService.getMessages();
  }
}
