import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../repositories/user/auth.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  async validateCredentials(userName: string, password: string): Promise<any> {
    this.loggerService.log(
      'LocalStrategy validateCredentials',
      'validateCredentials',
    );
    const validUser =
      process.env.USER === userName && process.env.PASSWORD === password;
    if (!validUser) {
      throw new UnauthorizedException();
    }
    return validUser;
  }
}
