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
