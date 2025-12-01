import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum, ValidateNested, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Employee, EmployeeWorkingHours } from '@prisma/client';
export enum RoleEmployee {
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
  WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER',
  MECHANIC = 'MECHANIC',
}

export class CreateEmployeeWorkingHoursDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsInt()
  employeeId: number;
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(RoleEmployee)
  rol: RoleEmployee;
}

export class EmployeeData {
  employee: Employee
  timeTableEmployee: EmployeeWorkingHours
}