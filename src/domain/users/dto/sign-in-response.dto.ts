import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class SignInResponseDto {
  @ApiProperty()
  access_token: string;
}
