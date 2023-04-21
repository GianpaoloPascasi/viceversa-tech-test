import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEventType } from '../../../model/message/event-type.enum';
import { MessageEntity } from './message.entity';

@Entity()
export class MessageEventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // enums not supported in SQLite
  @Column()
  eventType: string;

  @ManyToOne(() => MessageEntity, (msg) => msg.events)
  message: MessageEntity;

  @CreateDateColumn()
  sentAt: Date;

  constructor(type?: MessageEventType) {
    super();
    if (type) {
      this.eventType = type;
    }
  }
}
