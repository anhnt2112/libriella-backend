import { Logger } from '@nestjs/common';
import Redis from 'ioredis';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: async () => {
      const logger = new Logger('MongoDB');
      try {
        const connection = await mongoose.connect('mongodb://root:password@localhost:27017/nestjs-db?authSource=admin');
        logger.log('Successfully connected to MongoDB');
        return connection;
      } catch (error) {
        logger.error('Failed to connect to MongoDB', error);
        throw error;
      }
    }
  },
  {
    provide: 'REDIS_CONNECTION',
    useFactory: () => {
      const logger = new Logger('Redis');
      const redis = new Redis({
        host: 'localhost',
        port: 6379,
      });
      redis.on('connect', () => {
        logger.log('Successfully connected to Redis');
      });

      redis.on('error', (err) => {
        logger.error('Failed to connect to Redis', err);
      });
      return redis;
    }
  }
];
