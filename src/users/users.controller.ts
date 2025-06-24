import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usesrsService: UsersService) {}

  @Get()
  users() {
    return this.usesrsService.users();
  }
}
