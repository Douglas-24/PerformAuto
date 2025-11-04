import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { apiResponse } from 'src/core/utils/ApiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto):Promise<successfulResponse> {
    const newCar = await this.carsService.create(createCarDto);
    return apiResponse(201,'Coche añadido correctamente', newCar)
  }

  @Get()
  async findAll():Promise<successfulResponse> {
    const allCars = await this.carsService.findAll() 
    return apiResponse(200, 'Lista de coches', allCars)
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const car = await this.carsService.findOne(+id);
    return apiResponse(200, 'Coche obtenido correctamente',car)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto):Promise<successfulResponse> {
    const carUpdate = await this.carsService.update(+id, updateCarDto);
    return apiResponse(200, 'Coche actualizado', updateCarDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    const carDelete = await this.carsService.remove(+id);
    return apiResponse(200, 'Coche eliminado correctamente')
  }
}
