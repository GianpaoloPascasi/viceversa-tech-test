import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AddMessagesBody } from '../../../model/message/add.model';
import { AuthGuard } from '../../auth/auth/auth.guard';
import { UserSession } from '../../auth/user-session/user-session';
import { MessageService } from '../service/message.service';

@UseGuards(AuthGuard)
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
    if (this.session.user !== body.user) {
      throw new UnauthorizedException();
    }
    return this.messageService.addMessages(body);
  }

  @Get('messages')
  messages() {
    return this.messageService.getMessages(this.session.user);
  }
}
