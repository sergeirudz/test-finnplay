import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    protected readonly userRepository: Repository<Token>,
  ) {}

  async save(body: {
    user_id: number;
    token: string;
    expired_at: Date;
  }): Promise<Token> {
    return await this.userRepository.save(body);
  }

  async findOne(options: {
    user_id: number;
    expired_at: Date;
  }): Promise<Token | null> {
    return await this.userRepository.findOneBy(options);
  }

  async delete(options: { token: string }): Promise<any> {
    return await this.userRepository.delete(options);
  }
}
