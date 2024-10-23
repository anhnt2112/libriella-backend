import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Post()
  async create(@Body('username') username: string, @Body('password') password: string): Promise<User> {
    return this.userService.create(username, password);
  }

  @Patch(':username/password')
  async updatePassword(@Param('username') username: string, @Body('newPassword') newPassword: string) {
    return this.userService.updatePassword(username, newPassword);
  }
}
