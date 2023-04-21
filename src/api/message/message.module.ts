import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './controller/message.controller';
import { MessageEventEntity } from './entity/message-event.entity';
import { MessageEntity } from './entity/message.entity';
import { UserMessagesEntity } from './entity/user-message.entity';
import { MessageRepository } from './repository/message.repository';
import { MessageService } from './service/message.service';

@Module({
  providers: [MessageService, MessageRepository],
  controllers: [MessageController],
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      UserMessagesEntity,
      MessageEventEntity,
    ]),
    AuthModule,
  ],
})
export class MessageModule {}
