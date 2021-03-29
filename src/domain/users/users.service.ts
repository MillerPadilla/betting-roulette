import { Injectable } from '@nestjs/common';
import { UserDto, SignInDto, SignInResponseDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async signUp(userDto: UserDto): Promise<number> {
    return await this.usersRepository.create(userDto);
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const token = await this.usersRepository.signIn(signInDto);
    const response: SignInResponseDto = {
      access_token: token,
    };
    return response;
  }
}
