import { Request } from 'express';
import { UserSession } from '../user-session/user-session';
import { AuthMiddleware } from './auth.middleware';
import { sign as jwtSign } from 'jsonwebtoken';

describe('AuthMiddleware', () => {
  const userSession = new UserSession();
  const authMiddleware = new AuthMiddleware(userSession);
  const user = 'testUser';

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  const validToken = jwtSign(
    {
      user,
    },
    process.env.JWT_SECRET ?? 'test',
    { expiresIn: '1h' },
  );

  it('should validate jwt', () => {
    expect(() =>
      authMiddleware.use(
        {
          headers: {
            authorization: `Bearer ${validToken}`,
          },
        } as Request,
        {},
        () => true,
      ),
    ).not.toThrow();
  });

  it('should set email in user session instance', () => {
    authMiddleware.use(
      {
        headers: {
          authorization: `Bearer ${validToken}`,
        },
      } as Request,
      {},
      () => true,
    );
    expect(userSession.user).toBe(user);
  });

  it('should not validate jwt', () => {
    const token = jwtSign(
      {
        user,
        iat: Math.floor(Date.now() / 1000) - 30, // create expired jwt
      },
      process.env.JWT_SECRET ?? 'test',
      { expiresIn: '0s' }, // create expired jwt
    );
    expect(() =>
      authMiddleware.use(
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        } as Request,
        {},
        () => true,
      ),
    ).toThrow();
  });
});
