import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/data-provider/redis/redis.service';
import { RouletteDto, OpenRouletteDto } from './dto';

@Injectable()
export class RoulettesRepository {
  constructor(private redisService: RedisService) {}

  async getOne(rouletteId: string): Promise<RouletteDto> {
    return await this.redisService.hgetall(`roulette:${rouletteId}`);
  }

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
    if (resRoulette.open == 'true') {
      return true;
    }
    const response = await this.redisService.hmset(
      `roulette:${openRouletteDto.rouletteId}`,
      {
        open: 'true',
        round: Number(resRoulette.round) + 1,
      },
    );
    return response ? true : false;
  }
}
