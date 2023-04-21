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

  @OneToMany(() => MessageEventEntity, (event) => event.message, {
    eager: true,
  })
  events: Array<MessageEventEntity>;

  @Column({ default: false })
  notified: boolean;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  constructor(message: string) {
    super();
    this.message = message;
  }

  async sendEmail() {
    const evt = new MessageEventEntity(MessageEventType.email);
    evt.message = this;
    await evt.save();
    this.notified = true;
    await this.save();
  }
}
