import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsEmpty, IsNumberString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

@Injectable()
export class BetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  rouletteId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  round: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value), {
    toClassOnly: true,
  })
  @Min(0)
  @Max(10000)
  money: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value), {
    toClassOnly: true,
  })
  @Min(-2)
  @Max(36)
  number: string;

  @ApiProperty()
  @IsEmpty()
  won: string;
}
