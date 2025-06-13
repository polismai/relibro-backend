// import { UsersService } from './../../users/users.service';
// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { PUBLIC_KEY } from '../../common/constants/key-decorators';
// import { Request } from 'express';
// import { IUseToken } from '../interfaces/auth.interface';
// import { useToken } from '../../common/utils/use.token';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.get<boolean>(
//       PUBLIC_KEY,
//       context.getHandler(),
//     );

//     if (isPublic) {
//       return true;
//     }

//     const req = context.switchToHttp().getRequest<Request>();

//     const token = req.headers['token'] || req.headers['authorization'];

//     if (!token || Array.isArray(token)) {
//       throw new UnauthorizedException('Token no proporcionado o inválido');
//     }

//     const extractedToken =
//       typeof token === 'string' && token.startsWith('Bearer ')
//         ? token.split(' ')[1]
//         : token;

//     const manageToken: IUseToken | string = useToken(extractedToken);

//     if (typeof manageToken === 'string') {
//       throw new UnauthorizedException(manageToken);
//     }

//     if (manageToken.isExpired) {
//       throw new UnauthorizedException('Token expirado');
//     }

//     const { sub } = manageToken;
//     const user = await this.usersService.findUserById(sub);

//     if (!user) {
//       throw new UnauthorizedException('Usuario no autorizado');
//     }

//     req.idUser = user.id;
//     req.roleUser = user.role;

//     return true;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { PUBLIC_KEY } from '../../common/constants/key-decorators';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token =
      request.cookies['token'] || this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.findUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      request['user'] = user;
      request['userId'] = user.id;
      request['userRole'] = user.role;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader =
      request.headers['authorization'] || request.headers['token'];
    if (!authHeader || Array.isArray(authHeader)) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : authHeader;
  }
}
