import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization')?.replace('Bearer ', '');
    const payload = await this.authService.validateToken(token);
    if (!payload) {
      throw new UnauthorizedException('Token invalid, unauthenticated user');
    }
    req.user = payload;
    next();
  }
}
