import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DisabledGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    return false; // Bloquea el endpoint por regla de negocio
  }
}