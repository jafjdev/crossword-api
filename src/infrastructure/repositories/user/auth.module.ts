import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../controllers/user/auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LoggerService } from '../../logger/logger.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_KEY'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, LoggerService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
