import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserApiBody } from '../../../model/user/add.model';
import { UserService } from '../service/user.service';
import { sign as jwtSign } from 'jsonwebtoken';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: UserApiBody,
  })
  @Post('signup')
  createUser(@Body() body: UserApiBody) {
    return this.userService.createOrUpdate(body.user, body.password);
  }

  @ApiBody({
    type: UserApiBody,
  })
  @Post('login')
  async login(@Body() body: UserApiBody, @Res() response: Response) {
    const login = await this.userService.login(body.user, body.password);
    const jwtToken = jwtSign(
      {
        user: login.user,
      },
      process.env.JWT_SECRET ?? 'test',
      { expiresIn: '1h' },
    );
    response.setHeader('authorization', 'Bearer: ' + jwtToken);
    return {
      code: 200,
      msg: 'ok',
      data: {
        jwt: jwtToken,
        user: login.user,
      },
    };
  }
}
