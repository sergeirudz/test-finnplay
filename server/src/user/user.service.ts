import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
  ) {}

  async save(body: { username: string; password: string }): Promise<User> {
    return await this.userRepository.save(body);
  }

  async findOne(options: {
    id?: number;
    username?: string;
  }): Promise<User | null> {
    return await this.userRepository.findOneBy(options);
  }
}
