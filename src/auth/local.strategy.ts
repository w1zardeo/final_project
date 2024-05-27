import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const foundUser = await this.authService.validateUser(email, password);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    // Перевірка чи користувач має роль "admin" та чи його акаунт активний
    if (foundUser.role !== 'admin' || !foundUser.active) {
      throw new UnauthorizedException('You are not authorized to login.');
    }
    return foundUser;
  }
}