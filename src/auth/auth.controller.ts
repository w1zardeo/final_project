import { Controller, Request, Post, UseGuards, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Маршрут для входу в систему
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return { access_token: token.access_token };
  }

  // Маршрут для реєстрації нового користувача
  @Post('register')
  async register(@Body() user: any) {
    return this.authService.register(user);
  }

  // Захищений маршрут для отримання профілю користувача
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
