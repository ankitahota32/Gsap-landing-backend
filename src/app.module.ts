import { Module } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection, ConnectionStates } from 'mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(@InjectConnection() private connection: Connection) {
    console.log(
      'MongoDB Connection Status:',
      this.connection.readyState === ConnectionStates.connected
        ? 'Connected'
        : 'Disconnected',
    );
    this.connection.on('connected', () =>
      console.log('MongoDB connected successfully'),
    );
    this.connection.on('error', (err) =>
      console.log('MongoDB connection error:', err),
    );
    this.connection.on('disconnected', () =>
      console.log('MongoDB disconnected'),
    );
  }
}
