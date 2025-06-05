import {
  AuthTokenResult,
  IUseToken,
} from '../../auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;

    if (!decode || !decode.exp || !decode.sub || !decode.role) {
      return 'Token inválido';
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: decode.exp <= currentTimeInSeconds,
    };
  } catch (error) {
    console.log(error);
    return 'Token inválido';
  }
};
