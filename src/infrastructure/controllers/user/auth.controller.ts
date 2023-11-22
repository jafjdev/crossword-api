import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from '../../repositories/user/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { user } = req.body;
    return this.authService.login(user);
  }
}
