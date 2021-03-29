import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisConnection } from './data-provider/redis/redis.connection';
import { RedisService } from './data-provider/redis/redis.service';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'LLAVE',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [RedisConnection, RedisService, AuthService],
  exports: ['REDIS_CONNECTION', RedisService, AuthService],
})
export class InfrastructureModule {}
