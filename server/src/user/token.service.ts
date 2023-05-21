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

  async save(body: any): Promise<Token> {
    return await this.userRepository.save(body);
  }

  async findOne(options: any): Promise<Token | null> {
    return await this.userRepository.findOneBy(options);
  }

  async delete(options: { token: string }): Promise<any> {
    return await this.userRepository.delete(options);
  }
}
