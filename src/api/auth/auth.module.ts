import { Module } from '@nestjs/common';
import { AuthMiddleware } from './auth-middleware/auth.middleware';
import { UserSession } from './user-session/user-session';

@Module({
  providers: [AuthMiddleware, UserSession],
  exports: [AuthMiddleware, UserSession],
})
export class AuthModule {}
