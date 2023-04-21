import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MessageEventEntity } from './api/message/entity/message-event.entity';
import { MessageEntity } from './api/message/entity/message.entity';
import { UserMessagesEntity } from './api/message/entity/user-message.entity';

export const dataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [MessageEntity, UserMessagesEntity, MessageEventEntity],
  migrations: [],
  subscribers: [],
};
export const AppDataSource = new DataSource(dataSourceConfig);
