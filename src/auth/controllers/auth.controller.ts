import { Body, Controller, Post } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from 'src/common/utils/error.manager';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { email, password }: AuthBody) {
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Credenciales inválidas',
      });
    }

    return await this.authService.generateJWT(userValidate);
  }
}
