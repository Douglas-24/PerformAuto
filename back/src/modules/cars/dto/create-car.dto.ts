import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsUrl()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  enrolment: string; // matrícula

  @IsString()
//   @IsNotEmpty()
  chassis_number: string; // número de bastidor

  @IsString()
//   @IsNotEmpty()
  last_revision: string;

  @IsInt()
  current_mileage: number;

  @IsString()
  @IsNotEmpty()
  engine: string;

  @IsInt()
  ownerId: number;
}
