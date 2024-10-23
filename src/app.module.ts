import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule, RedisService } from 'nestjs-redis';
import { DatabaseModule } from './database/database.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
