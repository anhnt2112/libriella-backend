import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async updatePassword(username: string, newPassword: string): Promise<User> {
    const user = await this.findOne(username);
    user.password = newPassword;
    return user.save();
  }
}
