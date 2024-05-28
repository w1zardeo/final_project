import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { RolesGuard } from 'src/auth/role.guards';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  // @Roles('user')
  @Post('activate/:id')
  async activateUser(@Param('id') id: number) {
    return this.usersService.activateUser(id);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}


//   @Get()
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles('admin')
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles('admin')
//   findOne(@Param('id') id: number): Promise<User> {
//     return this.usersService.findOne(id);
//   }

//   @Put(':id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles('admin')
//   update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
//     return this.usersService.update(id, updateUserDto);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles('admin')
//   remove(@Param('id') id: number): Promise<void> {
//     return this.usersService.remove(id);
//   }
// }