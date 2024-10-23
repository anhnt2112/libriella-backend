import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionService } from './session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.headers['session-id'];

    if (!sessionId) return false;

    const userId = await this.sessionService.getSession(sessionId);
    return !!userId;
  }
}
