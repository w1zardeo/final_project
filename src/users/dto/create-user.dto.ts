import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;

  @IsString()
  password: string;
  
}