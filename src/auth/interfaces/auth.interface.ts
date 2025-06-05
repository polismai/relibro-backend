import { User } from '../../users/entities/user.entity';

export interface PayloadToken {
  sub: string;
  role: string;
}

export interface AuthBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
