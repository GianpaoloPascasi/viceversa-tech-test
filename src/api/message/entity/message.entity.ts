import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEventType } from '../../../model/message/event-type.enum';
import { MessageEventEntity } from './message-event.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
@Index(['message', 'user'], { unique: true })
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @OneToMany(() => MessageEventEntity, (event) => event.message, {
    eager: true,
  })
  events: Array<MessageEventEntity>;

  @Column({ default: false })
  notified: boolean;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  constructor(message?: string) {
    super();
    if (message) {
      this.message = message;
    }
  }

  async sendEmail() {
    const evt = new MessageEventEntity(MessageEventType.email);
    evt.message = this;
    await evt.save();
    this.notified = true;
    await this.save();
  }
}
