import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto, CreateEmployeeWorkingHoursDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto, UpdateTimeTableEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
// import { MailService } from '../mail/mail.service';
import { passwordGenerate } from 'src/core/utils/generator';
import { Employee, EmployeeWorkingHours } from '@prisma/client';
import { EmployeeData } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService  ) { }
  async create(newEmployee:EmployeeData):Promise<EmployeeData> {
    const user = await this.prisma.user.findFirst({ where: { email: newEmployee.employee.email } })
    if (user) throw new BadRequestException('Existe un usuario con el email ingresado')
    
    const employee = await this.prisma.employee.findFirst({ where: { email: newEmployee.employee.email } })
    if (employee) throw new BadRequestException('Existe un empleado con el email ingresado')
    
    const pass = passwordGenerate()
    const hash = await bcrypt.hash(pass, 10);
    newEmployee.employee.password = hash
    const createEmployee = await this.prisma.employee.create({ data: newEmployee.employee })

    newEmployee.timeTableEmployee.employeeId = createEmployee.id
    const timeTableEmployee = await this.prisma.employeeWorkingHours.create({data: newEmployee.timeTableEmployee})
    console.log(pass);
    
    // this.mailService.sendWelcone(createEmployee.email, `${createEmployee.name} ${createEmployee.lastname}`, pass)
    return {employee:createEmployee, timeTableEmployee: timeTableEmployee}
  }

  async findAll():Promise<Employee[]> {
    const allEmployee = await this.prisma.employee.findMany({
      include: {
        workingHour: true
      }
    })

    return allEmployee
  }

  async findOne(id: number):Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({
      where: {id: id},
      include: {
        workingHour: true
      }
    })
    if(!employee) throw new NotFoundException('Empleado')
    return employee
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto):Promise<Employee> {
    await this.findOne(id)
    const employeeUpdate = await this.prisma.employee.update({
      where: {id: id},
      data: updateEmployeeDto
    })
    return employeeUpdate
  }

  async updateTimeTableEmployee (id_employee:number, dataUpdate:UpdateTimeTableEmployeeDto):Promise<EmployeeWorkingHours>{
    await this.findOne(id_employee)
    return await this.prisma.employeeWorkingHours.update({
      where: {employeeId: id_employee},
      data: dataUpdate
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.employeeWorkingHours.delete({where: {employeeId: id}})
    await this.prisma.employee.delete({where: {id:id}})
  }
}
