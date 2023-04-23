import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiSecurity } from '@nestjs/swagger';
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
  @ApiSecurity('bearer')
  @Post('add-messages')
  addMessages(@Body() body: AddMessagesBody) {
    if (this.session.user !== body.user) {
      throw new UnauthorizedException();
    }
    return this.messageService.addMessages(body);
  }

  @ApiSecurity('bearer')
  @Get('messages')
  messages() {
    return this.messageService.getMessages(this.session.user);
  }
}
