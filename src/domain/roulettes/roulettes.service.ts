import { Injectable } from '@nestjs/common';
import { RouletteDto, OpenRouletteDto, CloseRouletteDto } from './dto';
import { RoulettesRepository } from './roulettes.repository';

@Injectable()
export class RoulettesService {
  constructor(private roulettesRepository: RoulettesRepository) {}

  async getAll(): Promise<RouletteDto[]> {
    return await this.roulettesRepository.getAll();
  }

  async create(rouletteDto: RouletteDto): Promise<number> {
    return await this.roulettesRepository.create(rouletteDto);
  }

  async open(openRouletteDto: OpenRouletteDto): Promise<boolean> {
    return await this.roulettesRepository.open(openRouletteDto);
  }

  async close(closeRouletteDto: CloseRouletteDto): Promise<any[]> {
    return await this.roulettesRepository.close(closeRouletteDto);
  }
}
