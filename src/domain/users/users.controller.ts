import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto, SignInDto, SignInResponseDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  async singUp(@Body() userDto: UserDto): Promise<number> {
    return await this.usersService.signUp(userDto);
  }

  @Post('/sign-in')
  async singIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return await this.usersService.signIn(signInDto);
  }
}
