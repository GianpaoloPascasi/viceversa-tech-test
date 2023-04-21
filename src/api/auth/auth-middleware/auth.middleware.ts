import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify as jwtVerify } from 'jsonwebtoken';
import { UserSession } from '../user-session/user-session';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(AuthMiddleware.name);

  constructor(private readonly session: UserSession) {}

  use(req: Request, res: any, next: () => void) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('No authorization provided');
    }
    try {
      const decoded = jwtVerify(token, process.env.JWT_SECRET ?? 'test');
      this.session.user = decoded.user;
      console.log(this.session, decoded);
    } catch (e) {
      this.logger.debug(e?.message ?? 'Could not verify JWT');
      throw new UnauthorizedException('Invalid JWT');
    }
    next();
  }
}
