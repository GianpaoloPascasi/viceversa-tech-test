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
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  message: string;

  @OneToMany(() => MessageEventEntity, (event) => event.message)
  events: Array<MessageEventEntity>;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  constructor(message: string) {
    super();
    this.message = message;
  }

  async sendEmail() {
    this.events.push(new MessageEventEntity(MessageEventType.email));
    await this.save();
  }
}
