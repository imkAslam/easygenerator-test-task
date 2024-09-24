import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 10,
        ttl: 60000,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.development`, '.env'],
    }),
    // MongooseModule.forRoot('mongodb://localhost/test'),
    // AuthModule,
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
