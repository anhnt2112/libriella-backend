import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
