import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { ROLES_KEY } from 'src/common/constants/key-decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const hasRole = () => requiredRoles.some((role) => user?.role === role);

    const valid = user && user.role && hasRole();

    if (!valid) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );
    }
    return valid;
  }
}
