import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SessionService } from '../session/session.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.userService.create(username, password);

    const session = await this.sessionService.createSession(newUser._id as string);
    return { session };
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ConflictException('Invalid credentials');
    }
    const session = await this.sessionService.createSession(user._id as string);
    return { session };
  }
}
