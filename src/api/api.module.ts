import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, MessageModule],
  exports: [AuthModule, MessageModule],
})
export class ApiModule {}
