import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = req.user;

    return {
      data: {
        user: {
          _id: user?.userId,
          name: user?.name,
          email: user?.email,
        },
        orders: [],
      },
    };
  }
}
