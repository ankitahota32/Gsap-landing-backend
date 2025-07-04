import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Registration successful', user };
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Login successful', user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
