import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class OpenRouletteDto {
  @ApiProperty()
  @IsNotEmpty()
  rouletteId: number;
}
