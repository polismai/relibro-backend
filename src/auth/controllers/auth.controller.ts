import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from 'src/common/utils/error.manager';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponse } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<AuthResponse> {
    const { email, password } = authDto;
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
