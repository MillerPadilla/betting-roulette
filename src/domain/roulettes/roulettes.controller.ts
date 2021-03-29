import { Body, Controller, Get, Post } from '@nestjs/common';
import { RouletteDto, OpenRouletteDto } from './dto';
import { RoulettesService } from './roulettes.service';

@Controller('roulettes')
export class RoulettesController {
  constructor(private roulettesService: RoulettesService) {}

  @Get('')
  async getAll(): Promise<RouletteDto[]> {
    return await this.roulettesService.getAll();
  }

  @Post('')
  async create(@Body() rouletteDto: RouletteDto): Promise<number> {
    return await this.roulettesService.create(rouletteDto);
  }

  @Post('/open')
  async open(@Body() openRouletteDto: OpenRouletteDto): Promise<boolean> {
    return await this.roulettesService.open(openRouletteDto);
  }
}
