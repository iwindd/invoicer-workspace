import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_GUEST } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];

    const isGuest = this.reflector.getAllAndOverride<boolean>(IS_GUEST, targets);
    if(isGuest) return true;

    const request = context.switchToHttp().getRequest();
    const [type, token_] = request.headers.authorization?.split(' ') ?? [];
    const token = type === 'Bearer' ? token_ : undefined;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_JWT_SECRET_KEY,
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}