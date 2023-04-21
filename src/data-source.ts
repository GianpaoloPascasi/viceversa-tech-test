import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MessageEntity } from './entity/message.entity';
import { UserMessagesEntity } from './entity/user-messages.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [MessageEntity, UserMessagesEntity],
  migrations: [],
  subscribers: [],
});
