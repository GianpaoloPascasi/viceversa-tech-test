import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './controller/message.controller';
import { MessageEventEntity } from './entity/message-event.entity';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../user/entity/user.entity';
import { MessageRepository } from './repository/message.repository';
import { MessageService } from './service/message.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [MessageService, MessageRepository],
  controllers: [MessageController],
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity, MessageEventEntity]),
    AuthModule,
    UserModule,
  ],
})
export class MessageModule {}
