import { ApiProperty } from '@nestjs/swagger';

export class AddMessagesBody {
  @ApiProperty()
  user: string;

  @ApiProperty()
  messages: Array<string>;
}
