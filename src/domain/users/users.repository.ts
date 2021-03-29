import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from 'src/infrastructure/data-provider/redis/redis.service';
import { AuthService } from 'src/infrastructure/providers/auth.service';
import { UserDto, SignInDto, SignInResponseDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(
    private redisService: RedisService,
    private authService: AuthService,
  ) {}

  async getId(userName: string): Promise<string> {
    return await this.redisService.hget('users', userName);
  }

  async getOne(userId: string): Promise<UserDto> {
    return await this.redisService.hgetall(`user:${userId}`);
  }

  async create(userDto: UserDto): Promise<number> {
    const userId = await this.redisService.incr('next_user_id');
    userDto.password = await this.authService.hashPassword(userDto.password);
    await this.redisService.hmset(`user:${userId}`, userDto);
    await this.redisService.hmset(`users`, {
      [userDto.userName]: userId,
    });
    return userId;
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const userId = await this.getId(signInDto.userName);
    if (!userId) {
      throw new BadRequestException('The user does not exist');
    }
    const userData = await this.getOne(userId);
    const valid = this.authService.validatePassword(
      signInDto.password,
      userData.password,
    );
    if (!valid) {
      throw new BadRequestException('The user or password is incorrect');
    }
    return this.authService.generateToken(userData);
  }
}
