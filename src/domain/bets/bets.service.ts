import { Injectable } from '@nestjs/common';
import { BetDto } from './dto';
import { BetsRepository } from './bets.repository';

@Injectable()
export class BetsService {
  constructor(private betsRepository: BetsRepository) {}

  async create(BetDto: BetDto): Promise<boolean> {
    return await this.betsRepository.create(BetDto);
  }
}
