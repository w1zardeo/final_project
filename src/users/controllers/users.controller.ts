import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe, Req, Request, NotFoundException, ForbiddenException, Patch } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { RolesGuard } from 'src/auth/role.guards';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('activate/:id')
  async activateUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.usersService.activateUser(id, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);   
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: any, 
    @Request() req: any
  ) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersService.updateUser(id, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id') 
  async deleteUser(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}