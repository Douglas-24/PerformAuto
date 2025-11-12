import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(new RoleGuard([Role.ADMIN, Role.CUSTOMER_SERVICE]))
  @Post()
  async create(@Body() createCarDto: CreateCarDto):Promise<successfulResponse> {
    const newCar = await this.carsService.create(createCarDto);
    return apiResponse(201,'Coche añadido correctamente', newCar)
  }

  @UseGuards(new RoleGuard([Role.ADMIN, Role.CUSTOMER_SERVICE]))
  @Get()
  async findAll():Promise<successfulResponse> {
    const allCars = await this.carsService.findAll() 
    return apiResponse(200, 'Lista de coches', allCars)
  }

  // @UseGuards(new RoleGuard([Role.ADMIN, Role.CUSTOMER_SERVICE]))
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const car = await this.carsService.findOne(+id);
    return apiResponse(200, 'Coche obtenido correctamente',car)
  }

  @UseGuards(new RoleGuard([Role.ADMIN, Role.CUSTOMER_SERVICE]))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto):Promise<successfulResponse> {
    const carUpdate = await this.carsService.update(+id, updateCarDto);
    return apiResponse(200, 'Coche actualizado', updateCarDto)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    const carDelete = await this.carsService.remove(+id);
    return apiResponse(200, 'Coche eliminado correctamente')
  }

  @Get('carsUser/:id')
  async getAllCarsUser(@Param('id') id:string):Promise<successfulResponse>{
    const allCars = await this.carsService.getAllCarsUser(+id)
    return apiResponse(200, 'Coche obtenidos correctamente', allCars)
  }
}
