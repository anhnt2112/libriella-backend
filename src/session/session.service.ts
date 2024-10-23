import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class SessionService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: 6379,
    });
  }

  async createSession(userId: string) {
    const sessionId = `session_${userId}`;
    await this.redisClient.set(sessionId, userId, 'EX', 60 * 60);
    return { sessionId };
  }

  async getSession(sessionId: string) {
    const userId = await this.redisClient.get(sessionId);
    return userId;
  }

  async deleteSession(sessionId: string) {
    await this.redisClient.del(sessionId);
  }
}
