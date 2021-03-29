import { Body, Controller, Get, Post } from '@nestjs/common';
import { BetDto } from './dto';
import { BetsService } from './bets.service';

@Controller('bets')
export class BetsController {
  constructor(private betsService: BetsService) {}

  @Post('')
  async create(@Body() betDto: BetDto): Promise<boolean> {
    return await this.betsService.create(betDto);
  }
}
