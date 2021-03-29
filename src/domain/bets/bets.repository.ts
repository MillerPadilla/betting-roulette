import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/data-provider/redis/redis.service';
import { RoulettesRepository } from '../roulettes/roulettes.repository';
import { UsersRepository } from '../users/users.repository';
import { BetDto } from './dto';

@Injectable()
export class BetsRepository {
  constructor(
    private redisService: RedisService,
    private roulettesRepository: RoulettesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async create(betDto: BetDto): Promise<boolean> {
    await this.validateUserAndRoulette(betDto);
    const betId = await this.redisService.incr('next_bet_id');
    betDto.won = '';
    const resbet = await this.redisService.hmset(`bet:${betId}`, betDto);
    const resbets = await this.redisService.sadd(
      `roulette_bets:${betDto.rouletteId}:${betDto.round}`,
      betId,
    );
    return resbet && resbets ? betId : 0;
  }

  async validateUserAndRoulette(betDto: BetDto) {
    const roulette = await this.roulettesRepository.getOne(betDto.rouletteId);
    const user = await this.usersRepository.getOne(betDto.userId);
    if (!user) {
      throw new BadRequestException('The user of the bet does not exist.');
    }
    if (
      !roulette ||
      roulette.round != betDto.round ||
      roulette.open != 'true'
    ) {
      throw new BadRequestException(
        'The bet cannot be placed, because the roulette wheel and round are not open or do not exist. ',
      );
    }
  }
}
