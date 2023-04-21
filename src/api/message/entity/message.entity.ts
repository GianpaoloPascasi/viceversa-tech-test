import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEventType } from '../../../model/message/event-type.enum';
import { MessageEventEntity } from './message-event.entity';
import { UserMessagesEntity } from './user-message.entity';

@Entity()
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  message: string;

  @OneToMany(() => MessageEventEntity, (event) => event.message)
  events: Array<MessageEventEntity>;

  @ManyToOne(() => UserMessagesEntity, (user) => user.messages)
  user: UserMessagesEntity;

  constructor(message: string) {
    super();
    this.message = message;
  }

  async sendEmail() {
    this.events.push(new MessageEventEntity(MessageEventType.email));
    await this.save();
  }
}
