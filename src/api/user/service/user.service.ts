import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public userMessagesRepository: Repository<UserEntity>, // public because we can get it and do custom queries if needed anywhere
  ) {}

  async createOrUpdate(user: string, password?: string) {
    if (!user) {
      throw new BadRequestException('Email is needed');
    }
    let found = await this.findByEmail(user);
    if (!found) {
      if (!password) {
        throw new BadRequestException('Password is needed to create a user');
      }
      found = new UserEntity(user, password);
      await found.save();
    }
    return this.findByEmail(user, true);
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (
      user.password !==
      createHash('sha256').update(`${password}${user.salt}`).digest('hex')
    ) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }

  async findByEmail(user: string, fetchMessages = false) {
    return this.userMessagesRepository.findOne({
      where: { user },
      relations: { messages: fetchMessages },
    });
  }
}
