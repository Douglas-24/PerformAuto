import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto, UpdateTimeTableEmployeeDto } from './dto/update-employee.dto';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';
import { EmployeeData } from './dto/create-employee.dto';
import { RoleGuard } from 'src/core/guards/role.guard';
import { RoleGuard as Role } from '@prisma/client';
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Post()
  async create(@Body() createEmployeeDto: EmployeeData):Promise<successfulResponse> {
    const employee = await this.employeeService.create(createEmployeeDto);
    return apiResponse(200, 'Empleado creado correctamente', employee)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Get()
  async findAll():Promise<successfulResponse> {
    const allEmployee = await this.employeeService.findAll();
    return apiResponse(200,"Lista de empleados", allEmployee)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const employee = await this.employeeService.findOne(+id);
    return apiResponse(200, 'Empleado obtenido correctamente', employee)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Patch('update-employee/:id')
  async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto):Promise<successfulResponse> {
    const employee = await this.employeeService.updateEmployee(+id, updateEmployeeDto);
    return apiResponse(200, 'Empleado actualizado corectamente', employee)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Patch('update-hour-employee/:id')
  async updateTimeTableEmployee(@Param('id') id: string, @Body() dataUpdate: UpdateTimeTableEmployeeDto):Promise<successfulResponse> {
    const employee = await this.employeeService.updateTimeTableEmployee(+id, dataUpdate);
    return apiResponse(200, 'Horario del empleado actualizado', employee)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    await this.employeeService.remove(+id);
    return apiResponse(200, 'Empleado eliminado correctamente')
  }
}
