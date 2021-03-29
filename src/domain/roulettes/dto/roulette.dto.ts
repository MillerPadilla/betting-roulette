import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class RouletteDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmpty()
  open: string;

  @ApiProperty()
  @IsEmpty()
  round: string;
}
