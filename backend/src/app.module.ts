import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import typeorm from './config/database.config';
import { SharedModule } from './shared/shared.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentModule } from './modules/graphql/appointments/appointment.module';

config();

@Module({
  imports: [
    // Add ConfigModule.forRoot() to the imports array, and pass in an
    // optional configuration object if needed like envs and other configurations
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [typeorm],
    }),

    // Add ThrottlerModule.forRoot() to protect applications
    //from brute-force attacks is rate-limiting limit is 10 for in 60sec (min)
    ThrottlerModule.forRoot([
      {
        limit: 10,
        ttl: 60000,
      },
    ]),

    // Importing modules
    SharedModule,

    UserModule,

    AuthModule,

    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
