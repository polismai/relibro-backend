import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from 'src/common/utils/error.manager';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Credenciales inválidas',
      });
    }

    return this.authService.generateJWT(user);
  }
}
