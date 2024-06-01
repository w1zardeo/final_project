import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { MailerService } from 'src/mailing/mail.service';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: Role.USER, 
      active: false, 
      
    });
    
    const admins = await this.usersRepository.find({ where: { role: Role.ADMIN } });
    const adminEmails = admins.map(admin => admin.email);

    await this.mailerService.notifyAdmins(adminEmails, newUser)

    return this.usersRepository.save(newUser);
  }

  async activateUser(id: number, currentUser: User): Promise<User> {
    console.log(currentUser);

    if (currentUser.role !== 'admin') {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.active = true;
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const post = await this.usersRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('User not found');
    }
    return post;
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);

    Object.assign(user, updateData);

    return this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
