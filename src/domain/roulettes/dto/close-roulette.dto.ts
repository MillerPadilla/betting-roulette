import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class CloseRouletteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  rouletteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  round: string;
}
