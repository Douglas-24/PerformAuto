import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { CreateEmployeeWorkingHoursDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class UpdateTimeTableEmployeeDto extends PartialType(CreateEmployeeWorkingHoursDto) {}
