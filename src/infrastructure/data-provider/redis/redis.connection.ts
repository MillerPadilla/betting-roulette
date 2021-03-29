import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';

export const RedisConnection = {
  provide: 'REDIS_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const client = redis.createClient({
      host: configService.get<string>('DB_REDIS_HOST'),
      port: configService.get<string>('DB_REDIS_PORT'),
      password: configService.get<string>('DB_REDIS_PASSWORD'),
    });
    client.on('connect', function () {
      console.log('Redis client connected');
    });
    client.on('error', function (error) {
      console.error(error);
    });
    return client;
  },
};
