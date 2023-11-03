import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../shared/decorators/decorators';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
/**
 * Auth Guard
 * AuthGuard is a class that implements the CanActivate interface.
 * If the route is public, the guard will allow the request to proceed. (without token)
 * If the route is not public, the guard will check if the token is valid.
 */
export class AuthGuard implements CanActivate {
  /**
   *
   * @param jwtService
   * @param reflector
   */
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /**
   *
   * @param context
   * @returns boolean, true if the route is public or if the token is valid
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>(); // Specify the Request type
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   *
   * @param request
   * @returns token if it exists in the header
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
