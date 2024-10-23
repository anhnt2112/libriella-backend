import { Controller, Post, Body, Get, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SessionService } from '../session/session.service';
import { SessionGuard } from '../session/session.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto.username, createUserDto.password);
  }

  @UseGuards(SessionGuard)
  @Get('session')
  async getSession(@Request() req) {
    const sessionId = req.headers['session-id'];
    const userId = await this.sessionService.getSession(sessionId);
    return { userId };
  }

  @UseGuards(SessionGuard)
  @Delete('session')
  async deleteSession(@Request() req) {
    const sessionId = req.headers['session-id'];
    await this.sessionService.deleteSession(sessionId);
    return { message: 'Session deleted' };
  }
}
