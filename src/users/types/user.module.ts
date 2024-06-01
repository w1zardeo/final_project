import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { MailModule } from 'src/mailing/mail.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), MailModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
  })
  export class UsersModule {}