import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      global: true,
      secret: 'fnqdG89lavVw702t', //! openssl rand -base64 12
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService],
})
export class UserModule {}
