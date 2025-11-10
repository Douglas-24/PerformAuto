import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto):Promise<successfulResponse> {
    const service = await this.serviceService.create(createServiceDto);
    return apiResponse(200, 'Servicio creado correctamente', service)
  }
  
  @Get()
  async findAll():Promise<successfulResponse> {
    const allService = await this.serviceService.findAll();
    return apiResponse(200, 'Obtenido todos los servicios correctamente', allService)
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const service = await this.serviceService.findOne(+id);
    return apiResponse(200, 'Servicio obtenido correctamente', service)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto):Promise<successfulResponse> {
    const updateService = await  this.serviceService.update(+id, updateServiceDto);
    return apiResponse(200, 'Servicio actuallizado correctamente', updateService)
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    await this.serviceService.remove(+id);
    return apiResponse(200, 'Servicio eliminado correctamente')

  }
}
