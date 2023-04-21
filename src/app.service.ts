import { Injectable } from '@nestjs/common';
import { Response } from './model/response.model';

@Injectable()
export class AppService {
  getStatus(): Response<Array<{ serviceName: string; status: boolean }>> {
    return {
      code: 200,
      msg: 'Service is ok',
      data: [
        {
          serviceName: 'Messenger',
          status: true,
        },
      ],
    };
  }
}
