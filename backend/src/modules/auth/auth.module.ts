import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

const jwtFactory = {
  useFactory: async (config: ConfigService) => {
    return {
      secret: config.get<string>('JWT_SECRET'),
      signOptions: {
        // expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        expiresIn: '60s',
      },
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [PassportModule, JwtModule.registerAsync(jwtFactory)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
