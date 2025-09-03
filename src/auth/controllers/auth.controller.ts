import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from '../../common/utils/error.manager';
import { AuthDto } from '../dto/auth.dto';
import { User } from '../../users/entities/user.entity';
import { Response } from 'express';
import { UsersService } from '../../users/users.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthResponse } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async loginWithCredentils(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: User }> {
    const { email, password } = authDto;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Credenciales inválidas',
      });
    }

    const { accessToken } = await this.authService.generateJWT(user);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user };
  }

  @Post('google')
  async loginWithGoogle(
    @Body() body: { email: string; name: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: User }> {
    const user = await this.authService.validateGoogleUser(body);

    const { accessToken } = await this.authService.generateJWT(user);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Sesión cerrada' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthResponse) {
    const user = req.user;
    return { user };
  }
}
