import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../interfaces/user.interface';

export class CreateUserDto {
 
  @IsEmail({}, { message: 'Enter Valid Email Address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password_hash: string;

  
  @IsEnum(UserRole)
  role: UserRole;
}