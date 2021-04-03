import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/data-provider/redis/redis.service';
import { BetsRepository } from '../bets/bets.repository';
import { RouletteDto, OpenRouletteDto, CloseRouletteDto } from './dto';
import { colorBetEnum } from './enums';

@Injectable()
export class RoulettesRepository {
  constructor(
    private redisService: RedisService,
    private betsRepository: BetsRepository,
  ) {}

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

  async closeStatus(rouletteId: string): Promise<boolean> {
    return await this.redisService.hset(
      `roulette:${rouletteId}`,
      'open',
      'false',
    );
  }

  getWinningNumber(): number {
    return Math.floor(Math.random() * 37);
  }

  async addWinningRouletteNumber(
    rouletteId: string,
    winningNumber: number,
  ): Promise<boolean> {
    return await this.redisService.sadd(
      `roulette_winners:${rouletteId}`,
      winningNumber,
    );
  }

  async getRoulleteBets(rouletteId: string, round: string): Promise<string[]> {
    return await this.redisService.smembers(
      `roulette_bets:${rouletteId}:${round}`,
    );
  }

  async getBettingResults(bets, winningNumber) {
    let betResults = [];
    for (let betId of bets) {
      const bet = await this.betsRepository.getOne(betId);
      let won = Number(bet.number) == winningNumber;
      let earnedMoney = 0;
      if (Number(bet.number) < 0) {
        const wonRed = winningNumber % 2 == 0;
        if (bet.number == colorBetEnum.red) {
          won = wonRed;
        } else {
          won = !wonRed;
        }
        earnedMoney = won ? Number(bet.money) * 1.8 : 0;
      } else {
        earnedMoney = won ? Number(bet.money) * 5 : 0;
      }
      bet.won = String(won);
      bet.earnedMoney = String(earnedMoney);

      await this.betsRepository.updateBetWinnings(betId, won, earnedMoney);
      betResults.push(bet);
    }
    return betResults;
  }

  async close(CloseRouletteDto: CloseRouletteDto): Promise<any[]> {
    const resRoulette = await this.getOne(CloseRouletteDto.rouletteId);
    if (!resRoulette) {
      throw new BadRequestException('The roulette does not exist');
    }
    if (resRoulette.open == 'false') {
      throw new BadRequestException('The roulette wheel is already closed');
    }
    const close = this.closeStatus(CloseRouletteDto.rouletteId);
    const winningNumber = this.getWinningNumber();
    const addWinner = await this.addWinningRouletteNumber(
      CloseRouletteDto.rouletteId,
      winningNumber,
    );
    const bets = await this.getRoulleteBets(
      CloseRouletteDto.rouletteId,
      CloseRouletteDto.round,
    );
    const betResults = this.getBettingResults(bets, winningNumber);
    return betResults;
  }
}
