import { BadRequestException } from '@nestjs/common';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity';
import { createHash } from 'crypto';
import { randomSalt } from '../../../utils/randomSalt';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  user: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: Array<MessageEntity>;

  constructor(user: string, password: string) {
    super();
    this.user = user;
    this.salt = randomSalt(10);
    this.password = createHash('sha256')
      .update(password + this.salt)
      .digest()
      .toString();
  }
}