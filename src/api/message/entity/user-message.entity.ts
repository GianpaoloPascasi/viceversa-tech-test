import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity()
export class UserMessagesEntity extends BaseEntity {
  @PrimaryColumn()
  user: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: Array<MessageEntity>;

  constructor(user: string) {
    super();
    this.user = user;
  }
}
