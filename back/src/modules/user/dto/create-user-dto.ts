import { IsString, IsEmail, IsInt, IsEnum, Matches, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  lastname: string;

  @IsString()
  dni: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  phone_number: number;

  @IsString()
  address: string;

  @IsInt()
  postal_code: number;

  @IsEnum(Role)
  rol: Role;
}
