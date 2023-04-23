import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity';
import { createHash } from 'crypto';
import { randomSalt } from '../../../utils/randomSalt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn()
  user: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @ApiProperty()
  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: Array<MessageEntity>;

  constructor(user?: string, password?: string) {
    super();
    if (user && password) {
      this.user = user;
      this.salt = randomSalt(10);
      this.password = createHash('sha256')
        .update(password + this.salt)
        .digest('hex');
    }
  }
}
