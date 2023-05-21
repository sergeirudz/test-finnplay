import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      autoLoadEntities: true, //! DELETE
      synchronize: true,
    }),
    UserModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
