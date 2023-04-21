import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MessageEventEntity } from './api/message/entity/message-event.entity';
import { MessageEntity } from './api/message/entity/message.entity';
import { UserEntity } from './api/user/entity/user.entity';

export const dataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [MessageEntity, UserEntity, MessageEventEntity],
  migrations: [],
  subscribers: [],
};
export const AppDataSource = new DataSource(dataSourceConfig);
