import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/data-provider/redis/redis.service';
import { RouletteDto, OpenRouletteDto } from './dto';

@Injectable()
export class RoulettesRepository {
  constructor(private redisService: RedisService) {}

  async getAll(): Promise<RouletteDto[]> {
    const roulettesIds = await this.redisService.smembers('roulettes');
    let roulettes = [];
    let roulette: RouletteDto;
    for (let rouletteId of roulettesIds) {
      roulette = await this.getOne(rouletteId);
      roulettes.push(roulette);
    }
    return roulettes;
  }

  async getOne(rouletteId: number): Promise<RouletteDto> {
    return await this.redisService.hgetall(`roulette:${rouletteId}`);
  }

  async create(rouletteDto: RouletteDto): Promise<number> {
    const rouletteId = await this.redisService.incr('next_roulette_id');
    rouletteDto.open = 'false';
    rouletteDto.round = '0';
    const resRoulette = await this.redisService.hmset(
      `roulette:${rouletteId}`,
      rouletteDto,
    );
    const resRoulettes = await this.redisService.sadd(`roulettes`, rouletteId);
    return resRoulette && resRoulettes ? rouletteId : 0;
  }

  async open(openRouletteDto: OpenRouletteDto): Promise<boolean> {
    const resRoulette = await this.getOne(openRouletteDto.rouletteId);
    if (!resRoulette) {
      throw new BadRequestException('The roulette does not exist');
    }
    const response =
      (await this.redisService.hset(
        `roulette:${openRouletteDto.rouletteId}`,
        'open',
        'true',
      )) || true;
    return response;
  }
}
