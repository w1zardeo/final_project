import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { compare } from 'bcrypt';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const foundUser = await this.usersService.findByEmail(email);

    if (foundUser == null) return null;

    if (foundUser.role !== Role.ADMIN && !foundUser.active) {
      throw new UnauthorizedException('You are not authorized to login.');
    }

    const isPasswordCorrect = await compare(
      pass, foundUser.password
    );
    
    if (isPasswordCorrect) {
        const { password, ...result } = foundUser;
        return result;
    }

    return null;
  }

  async login(user: any) {

    return {
      access_token: this.jwtService.sign(user),
    };
  }
  async register(user: any) {
    const newUser = await this.usersService.create(user);
    const { password, ...result } = newUser;
    return result;
  }
}

