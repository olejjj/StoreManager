import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true; // Jeśli endpoint nie ma tagu @Roles, wpuszczamy każdego

    const { user } = context.switchToHttp().getRequest();
    
    const hasRole = requiredRoles.some((role) => user?.role === role);
    if (!hasRole) throw new ForbiddenException('Tylko administrator może wykonać tę akcję!');

    return hasRole;
  }
}