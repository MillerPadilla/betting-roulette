import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user): string {
    const payload = { userId: user.id, userName: user.userName };
    return 'Bearer ' + this.jwtService.sign(payload);
  }

  async validatePassword(signInPassword: string, hashPassword: string) {
    return await bcrypt.compare(signInPassword, hashPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
