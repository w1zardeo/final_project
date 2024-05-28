import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: {email}})
  }

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = this.usersRepository.create(createUserDto);
  //   return this.usersRepository.save(user);
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: 'user', // Set default role to 'user'
      active: false, // Set default active status to false
    });
    return this.usersRepository.save(newUser);
  }

  async activateUser(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.active = true;
    return this.usersRepository.save(user);
  }
}

// async sendNewUserEmail(user: User) {
//   const transporter = nodemailer.createTransport({
//     // Налаштування для вашого провайдера електронної пошти
//   });

//   await transporter.sendMail({
//     from: 'your@email.com',
//     to: user.email,
//     subject: 'Welcome to Our App!',
//     text: `Hello ${user.username},\n\nWelcome to our app! Your account has been successfully created.`
//   });
// }

//   findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOneBy({ id });
//   }

  
//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     await this.usersRepository.update(id, updateUserDto);
//     return this.usersRepository.findOneBy({ id });
//   }

//   async remove(id: number): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }