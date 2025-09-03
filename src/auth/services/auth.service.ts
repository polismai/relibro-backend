import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { PayloadToken } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  public async validateGoogleUser(body: {
    email: string;
    name: string;
  }): Promise<User | null> {
    let user = await this.usersService.findUserByEmailOrNull(body.email);

    if (!user) {
      const [firstName, ...rest] = body.name.split(' ');
      const lastName = rest.join(' ');

      user = await this.usersService.createUser({
        email: body.email,
        firstName,
        password: null,
        lastName: lastName || '',
      });
    }

    return user;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(
    user: User,
  ): Promise<{ accessToken: string; user: User }> {
    const userFromDb = await this.usersService.findUserById(user.id);

    const payload: PayloadToken = {
      role: userFromDb.role,
      sub: userFromDb.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: this.configService.get<string>('JWT_SECRET'),
        expires: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
      user,
    };
  }
}
