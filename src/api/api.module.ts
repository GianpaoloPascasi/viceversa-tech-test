import { Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
})
export class ApiModule {}
