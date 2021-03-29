import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class OpenRouletteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  rouletteId: string;
}
