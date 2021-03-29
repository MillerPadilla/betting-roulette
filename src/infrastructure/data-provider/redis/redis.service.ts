import { Inject, Injectable } from '@nestjs/common';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  public get = promisify(this.redisConnection.get).bind(this.redisConnection);
  public set = promisify(this.redisConnection.set).bind(this.redisConnection);
  public incr = promisify(this.redisConnection.incr).bind(this.redisConnection);
  public hset = promisify(this.redisConnection.hset).bind(this.redisConnection);
  public hmset = promisify(this.redisConnection.hmset).bind(
    this.redisConnection,
  );
  public hgetall = promisify(this.redisConnection.hgetall).bind(
    this.redisConnection,
  );
  public hget = promisify(this.redisConnection.hget).bind(this.redisConnection);
  constructor(@Inject('REDIS_CONNECTION') private redisConnection) {}
}
