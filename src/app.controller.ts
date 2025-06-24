import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/')
  checkDbConnection() {
    const status =
      this.connection.readyState === ConnectionStates.connected
        ? 'Connected'
        : 'Disconnected';
    return { database: status };
  }
}
