import { Inject, Injectable } from '@nestjs/common';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  public get: Function;
  public set: Function;
  public incr: Function;
  public hset: Function;
  public hmset: Function;
  public hgetall: Function;
  public hget: Function;
  public smembers: Function;
  public sadd: Function;

  constructor(@Inject('REDIS_CONNECTION') private redisConnection) {
    this.get = this.convertToAsynchronous('get');
    this.set = this.convertToAsynchronous('set');
    this.incr = this.convertToAsynchronous('incr');
    this.hset = this.convertToAsynchronous('hset');
    this.hmset = this.convertToAsynchronous('hmset');
    this.hgetall = this.convertToAsynchronous('hgetall');
    this.hget = this.convertToAsynchronous('hget');
    this.smembers = this.convertToAsynchronous('smembers');
    this.sadd = this.convertToAsynchronous('sadd');
  }

  convertToAsynchronous(key) {
    return promisify(this.redisConnection[key]).bind(this.redisConnection);
  }
}
